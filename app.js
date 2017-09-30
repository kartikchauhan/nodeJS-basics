var fs = require('fs');
var url = require('url');

function renderHtml(path, response)
{
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(path, 'utf-8', function(err, data) {
        if(err)
            throw err;
        else
            {
                response.write(data);
                response.end();
            }
    });
}

module.exports = {

    handleRequest: function(request, response) 
    {                
        var path = url.parse(request.url).pathname;
        switch(path)
        {
            case '/': renderHtml('./index.html', response);
            break;
            
            case '/login': renderHtml('./login.html', response);
            break;
            
            default:
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write('URL not found');
                response.end();
            break;
        }
    }
};