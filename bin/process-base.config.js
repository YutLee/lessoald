module.exports = {
 "apps" : [{
    "name": "lessocloud",
    "script": "bin/www",
    "max_memory_restart": "150M",
    "watch" : ["routes", "app.js", "api", "custom_modules"],
    "ignore_watch": ["node_modules"]
  }]
}