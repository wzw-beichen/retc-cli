#!/usr/bin/env node

import chalk from "chalk"; //用于字体加色
import download from 'download-git-repo'; //用于下载git的包
import ora from 'ora'; //进度显示
import inquirer from "inquirer"; //用于与用户输入做交互

inquirer
  .prompt([
    {
      type: "input",
      name: "fileName",
      message: "请输入创建的文件名",
      validate: (val) => {
        if (!val) {
          return 'fileName is Required';
        }
        return true
      }
    },
  ]).then((answers) => {
    const { fileName } = answers;
    const spinner = ora('Downloading...')
    spinner.start()
   
    download(`direct:https://github.com/wzw-beichen/retc-cli-template.git`, fileName, { clone: true }, err => {
      if (err) {
        spinner.fail()
        console.log(chalk.red(`Generation failed. ${err}`))
        return;
      }
      // 结束加载图标
      spinner.succeed()
      console.log(chalk.green('Generation completed!'))
      console.log('To get started')
      console.log(`cd ${fileName}`)
    })
  })

