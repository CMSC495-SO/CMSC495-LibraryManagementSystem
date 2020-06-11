var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'web',
    paths: {
        connConfig: 'serverConfig.json'
    }
});

requirejs([
    'http',
    'fs',
    'express',
    'mongoose',
    'body-parser',
    'cors',
    'routes/sampleRoute',

], function (http, fs, express, mongoose, bodyParser, cors, sampleRoute) {
    const conInformation = JSON.parse(fs.readFileSync('serverConfig.json', 'utf-8'));
    const conString = conInformation.local.connectionString;
    const dbName = conInformation.local.dbName;

    const app = express();
    const server = http.createServer(app);

    init();

    function init() {
        registerRouter();
        setAppPreferences();
        manageDBConnection();
        startServer();
    }

    function manageDBConnection() {
        mongoose.connect(conString + dbName, {useUnifiedTopology: true}, function (err) {
            console.log('Database connection:', err === null ? 'success' : err);
        });
    }

    function registerRouter() {
        app.use('/sample', sampleRoute);
    }

    function startServer() {
        const port = 3000;
        server.listen(port);

        console.debug('Server listening on port ' + port);
    }

    function setAppPreferences() {
        var Chats = mongoose.model('Chats', {
            name: String,
            chat: String,
            timestamp: Number
        });
        var Library = mongoose.model('Library', {
            name: String,
            timeStamp: Number
        });
        var whiteList = conInformation.local.cors;

        app.use(cors({
            origin: function (origin, callback) {
                console.log('origin %s', origin);
                if (whiteList.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        }));
        app.use(express.json());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(express.static(__dirname));

        app.use('/test', function (req, res) {
            res.send('Home Page works :-)');
        });

        /*register service requests*/
        app.post("/chats", async (req, res) => {
            try {
                var chat = new Chats(req.body);
                await chat.save();
                res.sendStatus(200)
            } catch (error) {
                res.sendStatus(500);
                console.error(error)
            }
        });

        app.get("/chats", (req, res) => {
            Chats.find({}, (error, chats) => {
                res.send(chats);
            });
        });

        app.post("/library", async function(req, res) {
            try {
                console.log('request', req.body);
                var library = new Library(req.body);
                library.save();
                res.sendStatus(200);
            } catch(ex) {
                res.sendStatus(500);
                console.error(error);
            }
        });
    }
});


/* configure imports */
/*var CM = require('web/schema/chat/chat.model');
var chatModel = new CM();*/

