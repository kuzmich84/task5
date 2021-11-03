export default (x, User, m) => {
    const router = x.Router();
    const urlencodedParser = x.urlencoded({extended: false});
    router
        .route('/')
        .get(async (req, res) => {
            res.json(await User.find());
        })
        .post(urlencodedParser, async (req, res) => {
            const {login, password, URL} = req.body;
            const newUser = new User({login, password});
            try {
                await m.connect(URL)
                await newUser.save();
                res.status(201).json('Добавлено: ' + login)
            } catch (e) {
                res.status(400).json({'Ошибка:': 'Нет пароля' })
            }
        })

    router
        .route('/:login')
        .get(async (req, res) => {
            const {login} = req.params;
            res.json(await User.find({login}))
        })
    return router;
}