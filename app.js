export default function appSrc(express, bodyParser, createReadStream, crypto, http) {

    const app = express();

    const allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
        next();
    }

    app.get('/login/', allowCrossDomain, (req, res) => {
        res.status(200).send('kuchukov_d')
    })

    app.get('/code/', allowCrossDomain, (req, res) => {
        const filename = './app.js'
        let readStream = createReadStream(filename);

        readStream.on('open', function () {
            readStream.pipe(res);
        });
    })

    app.get('/sha1/:input/', allowCrossDomain, (req, res) => {
        res.send(crypto.createHash("sha1")
            .update(req.params['input'])
            .digest("hex"))
    })

    function httprequest(url) {
        return new Promise((resolve, reject) => {
            const req = http.get(url, (res) => {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }
                let body = [];
                res.on('data', function (chunk) {
                    body.push(chunk);
                });
                res.on('end', function () {
                    try {
                        body = JSON.parse(Buffer.concat(body).toString());
                    } catch (e) {
                        reject(e);
                    }
                    resolve(body);
                });
            });
            req.on('error', (e) => {
                reject(e.message);
            });
            req.end();
        });
    }


    app.get('/req/',  allowCrossDomain, function (req, res) {
        httprequest(req.query.addr).then((data) => {
            const response = {
                body: JSON.stringify(data),
            };
            res.status(200).send(response.body)
        });
    })

    const urlencodedParser = bodyParser.urlencoded({extended: false});

    app.post('/req/', allowCrossDomain, urlencodedParser, function (req, res) {
        httprequest(req.body.addr).then((data) => {
            res.status(200).send(JSON.stringify(data))
        })

    })

    app.all('/*/',allowCrossDomain, (req, res) => {
        res.status(200).send('kuchukov_d')
    })

    return app;
}