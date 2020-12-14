if ($response.statusCode != 200) {
    $done(Null);
}

var default_regionName = "Oops!!!";
var default_city = "Oh No!!!";
var default_isp = "Cross Utility Ltd";

/**
 * @return {string}
 */
function RegionName_Check(para) {
    if (para) {
        return para;
    } else {
        return default_regionName;
    }
}

/**
 * @return {string}
 */
function City_Check(para) {
    if (para) {
        return para;
    } else {
        return default_city;
    }
}

/**
 * @return {string}
 */
function Isp_Check(para) {
    if (para) {
        return para;
    } else {
        return default_isp;
    }
}

var body = $response.body;
var obj = JSON.parse(body)["data"];
var title = obj['country'];
var subtitle = default_city + default_isp;

var index = obj['isp'].indexOf('(');
if (index != -1) {
    subtitle = RegionName_Check(obj['province']) + ' ➠ ' + Isp_Check(obj['isp'].substring(0, index).trim());
} else {
    subtitle = RegionName_Check(obj['province']) + ' ➠ ' + Isp_Check(obj['isp']);
}

var ip = obj['query'];
//var description = obj['isp'] + '\n' + RegionName_Check(obj['regionName']) + '\n' + obj['query'] + '\n' + obj['timezone'];
var description = obj['country'] + '\n' + RegionName_Check(obj['province']) + '\n' + City_Check(obj['city']) + '\n' + obj['addr'] + '\n' + Isp_Check(obj['isp']);

$done({title, subtitle, ip, description});
