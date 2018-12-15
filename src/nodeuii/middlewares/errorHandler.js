const errorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        logger.error(error);
        ctx.status = ctx.status || 500;
        ctx.body = await ctx.render('error');
      }
    });

    app.use(async (ctx, next) => {
      await next();
      if("404" == ctx.status) {
        // 由于百度K权，此处设置为200
        ctx.status = 200;
        ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>';
      }
    });
  }
}

module.exports = errorHandler;