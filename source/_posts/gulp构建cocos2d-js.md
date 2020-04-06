---
title: gulp构建cocos2d-js
date: 2020-04-06 20:39:28
tags: "gulp cocos2d-js"
---

###安装gulp
安装gulp命令行工具 
````
    npm install --global gulp-cli
````
创建目录并初始化package.json
````
npx mkdir {my-project}
cd {my-project}
npm init
````

安装 gulp，作为开发时依赖项
````
npm install --save-dev gulp
gulp --version
````
在项目根目录下创建gulpfile.js文件  

安装插件  
````
npm i --save-dev gulp-concat  //合并js文件 
npm i --save-dev gulp-clean   // 清理某个目录 
npm i --save-dev gulp-uglify   //压缩js代码 
npm i --save-dev gulp-uglify-es   //压缩js代码  支持es6语法
npm i --save-dev gulp-rev   //给资源文件生成映射关系 md5码 
npm i --save-dev gulp-rev-collector  //根据生成的映射关系替换html中的文件名
npm i --save-dev gulp-sourcemaps  //生成sourcemap插件 
npm i --save-dev gulp-del  //删除文件
````

在文件中导入插件 
````
 const {parallel,series ,src,dest } = require('gulp');
 const gulp = require('gulp');
 const uglify = require('gulp-uglify-es').default;
 //const uglify = require('gulp-uglify');
 const rename = require('gulp-rename');
 const concat = require('gulp-concat');
 const revCollector = require('gulp-rev-collector');
 const rev = require('gulp-rev');   // 生成映射
 const clean = require('gulp-clean');
 const sourcemap = require('gulp-sourcemaps');
 const babel = require('gulp-babel');
 const del = require('del')
 ````
根据project.json 和moduleConfig.json文件读取引擎目录下的所有js文件
````
let fs = require('fs');
let cacheModule = {}
let prex = './frameworks/cocos2d-html5/'
function readJson(path){
    let str = fs.readFileSync(path,'utf8');
    let json = JSON.parse(str);
    return json;
}

function readAllFiles(){
    let projectCfg = readJson('./project.json');
    let moduleConfig = readJson(prex + 'moduleConfig.json');
    let projectModule = projectCfg['modules'];
    let files = new Array();
    files.push(prex + moduleConfig['bootFile']);

    for(let i =0;i < projectModule.length;i++){
        let name = projectModule[i];
        let module = moduleConfig['module'][name];
        if(module){
            if (cacheModule[name]) continue ;
            cacheModule[name] = 1;
            for(let j = 0;j < module.length;j++){
                let testname = module[j];
                if (cacheModule[testname]) continue;
                cacheModule[testname] = 1;
                if(module[j].indexOf('.js') !== -1){
                    files.push(prex+module[j])
                }else {
                    getFilesFromModule(files,moduleConfig['module'],module[j])
                }
            }
        }
    }

    for (let i = 0;i < projectCfg.jsList.length;i++){
        files.push(projectCfg.jsList[i])
    }
    files.push('./game.min.js');
    return files;
}

function getFilesFromModule(files,module,str) {
    if (module[str]){
        let modules = module[str];
        for (let i = 0;i < modules.length;i++){
            let name = modules[i];
            if (cacheModule[name]) continue ;
            cacheModule[name] = 1;
            if (name.indexOf('.js') !== -1){
                files.push(prex+name)
            } else {
                getFilesFromModule(files,module,name)
            }
        }
    }
}
````
打包js文件 且生成sourcemap
````
function concatJs() {
    let files = readAllFiles();
    let arr = [...files];
    return src(arr)
        //.pipe(babel())
        .pipe(sourcemap.init())
        .pipe(concat('game.min.js'))

        .pipe(uglify())
        .pipe(sourcemap.write('./') )
        .pipe(dest(`./`))
}
````
给项目目录下所有文件生成对应的映射关系，排除掉map文件不需要生成 最终映射关系在ls.json文件里面
````
function revAllRes() {
    return src([`./game.min.js`,`./res/**/*`,'!./**/*.map','!./res/data/*.json'],{base:'.'})
        .pipe(rev())
        .pipe(gulp.dest(`${projectPath}`))
        .pipe(rev.manifest({
            path: `ls.json`,
            merge: true
        }))
        .pipe(gulp.dest(`${projectPath}/ls/`));
}
````
直接拷贝 不需要生产md5
````
function copyOther(){
    return src(['./index.html','./project.json','./res/data/*.json'],{ base:'.' })
        .pipe(gulp.dest(`${projectPath}`));
}
````
修改project.json里面的参数 
````
function changeProjectJson(cb){
    let projectCfg = readJson(`${projectPath}project.json`);
    delete projectCfg['modules'];
    delete projectCfg['jsList'];
    projectCfg['noCache'] = false;
    fs.writeFileSync(`${projectPath}project.json`,JSON.stringify(projectCfg));
    cb()
}

let child_process = require('child_process');
function cleanDir(){
    child_process.exec('git checkout ./')
    return gulp.src(`${projectPath}`,{allowEmpty:true})
        .pipe(clean({allowEmpty:true}));
}
````

根据映射关系替换html里面的文件名 这边替换需要传入映射文件以及需要替换的html文件 ，映射文件中包含的扩展名必须都列出来 否则不会生效
````
function revHtml(){
    return gulp.src([`${projectPath}ls/ls.json`,`${projectPath}*.html`])
        .pipe(revCollector({
            extMap:{
                '.json':'.json',
                '.jpg':'.jpg',
                '.png':'.png',
                '.plist':'.plist',
                '.tmx':'.tmx',
                '.ico':'.ico',
            }
        }))
        .pipe(gulp.dest(`${projectPath}`));
}
exports.default = series(cleanDir,concatJs,revAllRes,copyOther,parallel(changeProjectJson,revHtml));
````
[gulpfile](https://github.com/xiongb/gulp/blob/master/gulpfile.js)






 

