# fakenews-proxy
Laboration assignment for TDTS11

## Install
You need to have node.js and npm installed.
```
npm install
node .
```

## Config
You might want to change the port.  
```
const PORT = 4200
```

## Testing
The testing was done at my pc with firefox configured for HTTP only proxy. Does it work with https? No idea.   
Special characters like åäö does not seem to work well, which is a lower level encoding issue which was not worth looking into. All images seems to passthrough niceley.  
Other then that everything seems to work.  
You can use google with very few problems, which I think is impressive.

## Problems
With axios, it tries to convert it into a string which will "kill" data that are not string. To go around this issue  
```
headers = {
    responseType: "arraybuffer",
  };
  ```
  was required. Then we only convert the data when we know it is text by using
  ```
  if(response.headers["content-type"].includes("text")) ab2str(response.data))
  ```
  A package called arraybuffer-to-string was used for this.

## Limitations
The proxy only handles get request and does not forward any headers from the req. Meaning that manipulating data with POST is impossible with this proxy. 
