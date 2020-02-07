const { hooks } = use('@adonisjs/ignitor')

hooks.after.providersBooted(() => {

    const Exception = use('Exception')
    const Env       = use('Env')
    const slash     = use('Env').get('APP_URL_SLASH')
    const View      = use('View')
  
    Exception.handle('InvalidSessionException', async (error, {response}) =>{
        return response.redirect(slash+'/login')
    })

    Exception.handle('HttpException', async (error, {response}) =>{
        return response.redirect(slash+'/dashboard')
    })

    View.global('URLBASE', () => {
        return Env.get('APP_URL_PROD')
    })
})
