$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 注册发送按钮点击事件
    $('#btnSend').on('click', function () {
        // 判断用户输入是否为空 为空返回空
        var text = $('#ipt').val().trim()
        if (text.length <= 0) return $('#ipt').val()

        // 如果用户输入聊天内容 则将内容显示到页面上
        $('#talk_list').append(`<li class='right_word'><img src="img/person02.png"/><span>${text}</span></li>`)
        $('#ipt').val('')
        // 重置滚动条的位置
        resetui()
        // 发起请求 获取聊天内容
        getMsg(text)
    })

    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                console.log(res)
                if (res.message === 'success') {
                    // 接收聊天信息
                    let msg = res.data.info.text
                    $('#talk_list').append(`<li class="left_word"><img src="img/person01.png"/><span>${msg}</span></li>`)
                    // 重置滚动条位置
                    resetui()
                    // 文字变音频
                    getVoice(msg)
                }
            }
        })
    }

    // 将文字转换语音进行播放
    function getVoice(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                if (res.status === 200) {
                    console.log(res.voiceUrl);
                    $('#voice').prop('src', res.voiceUrl)
                }
            }
        })
    }

    // 按下回车键 发送消息
    $('#ipt').on('keyup', function (e) {
        //  如果是13  代表回车键 直接触发 发送按钮 点击事件
        if (e.keyCode === 13) { 
            $('#btnSend').click()
        }
    })
})