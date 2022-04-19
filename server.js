const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const ShortUrl = require('./models/shortUrl')
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')
const fileupload = true;

function file2Number(filepath, number) {
	const seperator = '-';
		
	let dir = path.dirname(filepath);
	let ext = path.extname(filepath);
	let base = path.basename(filepath, ext);

	let append = seperator + number;

	const filename = path.join(dir, base + append + ext);

	return filename;
}

const storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
			var filename = file.originalname
			var count = 1;
			var filepath = __dirname + '/uploads/' + filename
			while (fs.existsSync(filepath)) {
				var filename = file2Number(filename, count)
				var filepath = __dirname + '/uploads/' + filename
				count += 1;
			} 
            cb( null, filename );
			
        }
    }
);
const upload = multer({ storage: storage });

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '1gb' }));

mongoose.connect(process.env['MONGO_URI'], {
	useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const sort = req.query.sort || 'desc';
	
	const shortUrls = await ShortUrl.find({ ip: ip }).sort({ createdAt: sort }).exec()
	res.render('index', { shortUrls: shortUrls, fileinput: fileupload })
})

app.post('/shorten', upload.single('file'), async (req, res) => {
	var fullUrl = req.body.fullUrl || ''
	const shortUrl = req.body.shortUrl || undefined
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
	const exists = await ShortUrl.find({ short: shortUrl })
	var filename = '404';

	if (req.file && fileupload) {
		var file = req.file;
		var filename = file.filename;
		fullUrl = '/file/' + filename
	}

	if (!fullUrl.includes('http') && !req.file) {
		fullUrl = 'http://' + fullUrl
	}

	// console.log(exists)
	
	if (exists.length < 1) {
		// console.log({ full: fullUrl, short: shortUrl, mimetype: mimetype, filename: filename, ip: ip })
		await ShortUrl.create({ full: fullUrl, short: shortUrl, ip: ip, filename: filename })
		res.redirect('/')
	} else {
		res.redirect('/' + '?err=409')
	}
})

app.get('/file/:filename', async (req, res) => {
	// const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
	// if (shortUrl == null) return res.sendStatus(404)

	var filename = req.params.filename;
	// filename = filename.split('/file/')

	console.log(filename)
	// if (filename && !filename[2])
	if (filename) { 
		// filename = filename[1]
		// console.log(filename)
		return res.sendFile(__dirname + '/uploads/' + filename)
	}
	return res.sendStatus(404)
})

app.get('/:shortUrl', async (req, res) => {
	const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
	if (shortUrl == null) return res.sendStatus(404)

	shortUrl.clicks++
	shortUrl.save()

	// res.redirect(shortUrl.full)
	res.render('redirect', { url: shortUrl.full, filename: shortUrl.filename })
})

app.get('/delete/:shortUrl', async (req, res) => {
	const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
	if (shortUrl == null) return res.sendStatus(404)
	
	await ShortUrl.findOneAndDelete({ short: req.params.shortUrl })

	const filename = shortUrl.filename

	fs.unlink(__dirname + '/uploads/' + filename, () => {
		res.redirect('/?err=204')	
	})
})

app.listen(process.env.PORT || 5000);
