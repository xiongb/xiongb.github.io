---
title: Hexo git搭建个人博客
categories: "Hexo 相关"
tags: "Hexo"
---

### 安装node.js   
####  安装完成 node -v 查看版本号

``` bash
 node -v  
```

#### 由于官方镜像国内访问较慢,安装成功后可设置使用淘宝镜像

```` bash
npm config set registry https://registry.npm.taobao.org
````
#### 可通过nrm ls查看所有镜像地址

```` bash
nrm ls
````
### 安装git 
#### 安装成功后设置用户名邮箱 

````bash
git config --global user.name "your name"
git config --global user.email "your email"
````
#### 配置SSH key  
````bash
ssh-keygen -t rsa -C "邮件地址"   // 生成key
````
然后连续3次回车，最终会生成一个文件在用户目录下，打开用户目录，找到.ssh\id_rsa.pub文件，记事本打开并复制里面的内容，打开你的github主页，进入个人设置 -> SSH and GPG keys -> New SSH key：

#### 验证是否成功
````bash
ssh -T git@github.com # 注意邮箱地址不用改  //验证成功
````

### 安装hexo 
````bash  
    npm install -g hexo-cli
````
#### 新建hexo工程：请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件  
````bash
$ hexo init <folder>
$ cd <folder>
$ npm install
````
#### hexo本地部署  

````bash
    hexo clean  清理目录
    hexo g 生成静态文件 
    hexo s 启动本地服务器 
    hexo d 发布到网站 （需要特殊配置）
````

### 静态网页部署至github
#### 新建仓库
登陆自己的github 新建一个一个仓库 Repositories

 {% asset_img 1111.jpg %}
 
插入图片时由于官方插件有问题 这里用了别人改过的
````
npm install https://github.com/7ym0n/hexo-asset-image --sa 
````
在Repositories name 输入 yourname.github.io,   yourname代表你自己github账号 
待部署成功后可通过https://yourname.github.io 访问你部署的网站 
#### 配置git 
#### 安装插件 
````bash
npm install --save hexo-deployer-git
````
#### 修改_config.yml文件  
打开网站目录的 _config.yml
移动到最低端，在deploy:后面写入内容  注意空格很重要，刚开始忽略了空格出现了问题
````
type: git  
  repo: github仓库地址    
  branch: master 
  ````
我的仓库地址    repo: git@github.com:xiongb/xiongb.github.io.git
  
#### 最后通过hexo d推送到github   可通过https://yourname.github.io访问了
````bash
hexo d
````


 [Hexo](https://hexo.io/)
 [documentation](https://hexo.io/docs/)
 [troubleshooting](https://hexo.io/docs/troubleshooting.html) 
 [github](https://github.com/hexojs/hexo/issues).


