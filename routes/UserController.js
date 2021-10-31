export default (x, User) => {
    const router = x.Router();
    router
        .route('/')
        .get(async (req, res)=>{
            res.json(await User.find());
        })
        .post(async (req, res)=>{
            const {login, password} = req.body;
            const newUser = new User({login, password});
            await newUser.save();
        })

        router
            .route('/:login')
        .get(async (req, res) => {
            const {login} = req.params;
            res.json(await User.find({login}))
        })
    return router;
}