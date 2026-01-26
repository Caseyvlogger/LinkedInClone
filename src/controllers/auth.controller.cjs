const register = async (req, res) => {
    console.log('IN controller, calling service.')
    const user=userService.createUser(req.body);
}

module.exports={register}