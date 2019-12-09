const { hooks } = use('@adonisjs/ignitor')

hooks.after.providersBooted(() => {

    const Exception = use('Exception')

    Exception.handle('InvalidSessionException', async (error, {response}) =>{
        return response.redirect('/login')
    })

    Exception.handle('HttpException', async (error, {response}) =>{
        return response.redirect('/dashboard')
    })

})