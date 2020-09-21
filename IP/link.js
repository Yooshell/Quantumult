if ($response.statusCode != 200) {
    $done(Null);
}

var default_city = "Las Vegas";
var default_org = "Cross Utility Ltd";

/**
 * @return {string}
 */
function City_Check(para) {
    if (para) {
        return para
    } else {
        return default_city
    }
}

/**
 * @return {string}
 */
function Org_Check(para) {
    if (para) {
        return para
    } else {
        return default_org
    }
}

var body = $response.body;
var obj = JSON.parse(body);
var title = obj['country'];
var subtitle = default_city + default_org;

var index = obj['org'].indexOf(' (');
if (index != -1) {
    subtitle = City_Check(obj['city']) + '-' + Org_Check(obj['org'].substring(0, index));
} else {
    subtitle = City_Check(obj['city']) + '-' + Org_Check(obj['org']);
}

var ip = obj['query'];
var description = obj['isp'] + '\n' + City_Check(obj['regionName']) + '\n' + obj['query'] + '\n' + obj['timezone'];

$done({title, subtitle, ip, description});
