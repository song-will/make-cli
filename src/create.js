const download = require('download-git-repo') // github api 拉取代码
const inquirer = require('inquirer')
const ora = require('ora')

const templateMap = {
    plain: 'template',
    vue2: 'template-vue2',
    vue3: 'template-vue3'
}

const fetchTemplate = async (options, filename) => {
    const { template } = options
    const templateUrl = `song-will/${templateMap[template]}` 
    // 根据template选择模板
    const loading = ora('fetching')
    loading.start()
    download(templateUrl, `${process.cwd()}/${filename}`,  err => {
       if (err) {
           console.log('err:', err)
           return
       }
       loading.succeed('success!!!')
   })
}

const templateOptions = ['plain', 'vue3']
const styleOptions = ['无','less', 'sass']
/**
 * 拉取代码之前询问配置，之后再根据用户选择
 */
const askOptions = async () => {
    // let answer = await inquirer.prompt([
    //     {
    //         type: 'input',        //你可以输入你自己的名称
    //         name: 'projectName', // answer对象的key1
    //         message:'项目名称',
    //         default:'my-proj'    //默认值
    //     }
    // ]);
    // console.log('answer', answer)
    const { template } = await inquirer.prompt([
        {
            type: 'list',
            name:'template',
            message:'请选择一个你要创建的项目',
            choices: templateOptions
        }
    ]);
    // const { style } = await inquirer.prompt([
    //     {
    //         type: 'list',
    //         name: 'style',
    //         message: '请选择css预处理器',
    //         choices: styleOptions
    //     }
    // ])
    return {
        template
    }
}


module.exports = async (projectName) => {

    // fetchTemplate(projectName)
    const result = await askOptions()
    fetchTemplate(result, projectName)
}