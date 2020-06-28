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
    'server/applicationServer',
    'socket.io'
], function (http, fs, express, mongoose, bodyParser, cors, sampleRoute, ApplicationServer, IO) {
    const conInformation = JSON.parse(fs.readFileSync('serverConfig.json', 'utf-8'));
    const conString = conInformation.environment.local.connectionString;
    const dbName = conInformation.environment.local.dbName;

    const app = express();
    const server = http.createServer(app);
    const io = IO(server);

    init();

    function init() {
        registerRouter();
        setAppPreferences();
        manageDBConnection();
        startServer();
        initializeSocketConnection();
    }

    function manageDBConnection() {
        mongoose.connect(conString + dbName, {useUnifiedTopology: true, useNewUrlParser: true}, function (err) {
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

    function initializeSocketConnection() {
        io.on('connection', (socket) => {
            var addedUser = false;

            socket.on('library-added', (data) => {
                debugger;
                socket.broadcast.emit('library-added', {
                    message: data
                });
            });
        });
    }

    function setAppPreferences() {
        var whiteList = conInformation.environment.local.cors;
        /*Chats = mongoose.model('Chats', {
            name: String,
            chat: String,
            timestamp: Number
        }),*/
        /*var Library = mongoose.model('Library', {
            name: String,
            timeStamp: Number
        });*/

        app.use(express.json());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(express.static(__dirname));
        app.use(cors({
            origin: function (origin, callback) {
                if (whiteList.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        }));

        ApplicationServer.init(app, io, {});

        /*register service requests*/
        app.use('/test', function (req, res) {
            res.send('Home Page works :-)');
        });

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
    }
});


/* configure imports */
/*var CM = require('web/schema/chat/chat.model');
var chatModel = new CM();*/

