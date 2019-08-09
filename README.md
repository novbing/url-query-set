# url-query-set

Set query or search params to a url link.

## Install

```bash
$ npm i url-query-set
```

## Usage

### querySet(link, queryMap)

```js
import querySet from 'url-query-set';

var link = querySet('https://a.com/b?c=1&d=2#g=5&h=6', { e: 3, f: 4 });

console.log(link);
// https://a.com/b?c=1&d=2&e=3&f=4#g=5&h=6
```

## License

[MIT](LICENSE)
