# revChatGPT-api

By using Http interfaces, it is possible to program across different programming languages.

docker hub: [https://hub.docker.com/r/qyvlik/revchatgpt-api](qyvlik/revchatgpt-api)

Build you own reverse proxy to avoid [security issues](https://github.com/transitive-bullshit/chatgpt-api#reverse-proxy). 

# start up

```bash
docker pull qyvlik/revchatgpt-api
docker run -it -p 7777:7777 qyvlik/revchatgpt-api
```

# api

## create ChatGPT

```bash
curl --location 'http://localhost:7777/api/chatgpt/create' \
--header 'Content-Type: application/json' \
--data '{
    "accessToken": "eyJ...zUw",
    "model": "text-davinci-002-render-paid"
}'
```

- `model`: If you are chatgpt plus use `text-davinci-002-render-paid` or  `text-davinci-002-render-sha`

```json
{
  "code": 200,
  "message": "success",
  "data": "fb39bfcb-72ae-456d-bd88-403952c5581e"
}
```

## first message

```bash
curl --location 'http://localhost:7777/api/chatgpt/send/fb39bfcb-72ae-456d-bd88-403952c5581e' \
--header 'Content-Type: application/json' \
--data '{
    "text": "你现在是一名经验老道的翻译，并且熟悉 markdown 语法，\n现在我会提供一份 markdown 的英文内容给你翻译，并保留 markdown 语法。\n翻译的内容必须以 ```markdown 开始，以 ``` 结束。\n如果你准备好了，就必须回答: 来吧, 小样!"
}'
```

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "role": "assistant",
        "id": "6164******9179",
        "parentMessageId": "9563******72e9",
        "conversationId": "30ab******e602",
        "text": "来吧, 小样!"
    }
}
```

## second and after

```bash
curl --location 'http://localhost:7777/api/chatgpt/send/fb39bfcb-72ae-456d-bd88-403952c5581e' \
--header 'Content-Type: application/json' \
--data '{
    "text": "1. 这是中文",
    "conversationId": "30ab******e602",
    "parentMessageId": "9563******72e9"
}'
```

- `conversationId` and `parentMessageId` must both be set or both be undefined

# ref

1. https://github.com/acheong08/ChatGPT
2. https://github.com/transitive-bullshit/chatgpt-api#usage---chatgptunofficialproxyapi
