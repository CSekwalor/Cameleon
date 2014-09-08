from fabric.api import cd, run, sudo, local, settings, roles, task, env, put
from os.path import abspath, dirname, join as joiner, isdir


@task
def deploy():
    app_folder = abspath(joiner(abspath(dirname(__file__)),
                                "../{}".format(env.local_src_name)))

    if not isdir(abspath(app_folder)):
        print('dist folder is not present in local folder.')
        raise SystemExit()

    # Copy `localsettings` in safety place
    run('cp %s %s' % (joiner(env.www_src_dir, 'localsettings.js'),
                      joiner(env.www_src_dir, '..', 'localsettings.js')))

    # Remove old dist content
    run('rm -fr %s' % env.www_src_dir)

    # Copy application to server
    put(app_folder, env.home_dir)

    # Copy back `localsettings` to app.
    run('cp %s %s' % (joiner(env.www_src_dir, '..', 'localsettings.js'),
                      joiner(env.www_src_dir, 'localsettings.js')))

    # Change `robots.txt` for staging server.
    if env.mode == 'staging':
        run('rm %s' % joiner(env.www_src_dir, 'robots.txt'))
        run('touch %s' % joiner(env.www_src_dir, 'robots.txt'))
        run('echo "User-agent: *" >> %s' % joiner(env.www_src_dir, 'robots.txt'))
        run('echo "Disallow: /" >> %s' % joiner(env.www_src_dir, 'robots.txt'))


