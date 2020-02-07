const { hooks } = use('@adonisjs/ignitor')

hooks.after.providersBooted(() => {

    const Exception = use('Exception')
    const Env       = use('Env')
    const View      = use('View')
  
    Exception.handle('InvalidSessionException', async (error, {response}) =>{
        return response.redirect(Env.get('APP_URL_PROD')+'/login')
    })

    Exception.handle('HttpException', async (error, {response}) =>{
        return response.redirect(Env.get('APP_URL_PROD')+'/dashboard')
    })

    View.global('URLBASE', () => {
        return Env.get('APP_URL_PROD')
    })

    View.global('SLASH', () => {
        return Env.get('SLASH')
    })
})
