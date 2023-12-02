import { ExecutionData } from "./Green";

interface CodePerformanceData {
    [key: string]: {
        before: ExecutionData;
        after: ExecutionData;
    };
}

export const PatternDetailData: CodePerformanceData =
{
    "11": {
        "before": {
            "code": "import java.util.HashMap;\nimport java.util.TreeMap;\n\nclass Main {\n\npublic static void main(String[] args) throws Exception {\n        String[] cats = new String[]{\"Hello\", \"How\", \"Are\", \"You\", \"I\", \"Am\", \"Fine\", \"Thank\", \"You\", \"And\"};\n        Integer age;\n\n        TreeMap<String, Integer> tMap = new TreeMap<>();\n        for (int i = 0; i < cats.length; i++) {\n            tMap.put(cats[i], i);\n        }\n        System.out.println(\"TreeMap ordered by keys (alphabetical order of the cats' names:\");\n        System.out.println(tMap);\n\n    }\n}",
            "time": "0.13334",
            "energy": "6.00260156723",
            "carbon": "2.4688700246",
            "samples": [
                {
                    "time": "0.1323",
                    "carbon": "2.4496266614257034",
                    "energy": "5.955814883116225"
                },
                {
                    "time": "0.1338",
                    "carbon": "2.4773090743981387",
                    "energy": "6.023119558468609"
                },
                {
                    "time": "0.1378",
                    "carbon": "2.5514293851559584",
                    "energy": "6.2033294071382405"
                },
                {
                    "time": "0.1361",
                    "carbon": "2.5198715317878952",
                    "energy": "6.126602314096512"
                },
                {
                    "time": "0.13",
                    "carbon": "2.4070020650858335",
                    "energy": "5.8521810481056"
                },
                {
                    "time": "0.1363",
                    "carbon": "2.523575486825512",
                    "energy": "6.135607796804065"
                },
                {
                    "time": "0.1381",
                    "carbon": "2.557095113866703",
                    "energy": "6.217104580274016"
                },
                {
                    "time": "0.1219",
                    "carbon": "2.2571120408565166",
                    "energy": "5.487751132644096"
                },
                {
                    "time": "0.1361",
                    "carbon": "2.5200467969491704",
                    "energy": "6.127028438971968"
                },
                {
                    "time": "0.131",
                    "carbon": "2.425632089674629",
                    "energy": "5.89747651270272"
                }
            ]
        },
        "after": {
            "code": "import java.util.HashMap;\nimport java.util.TreeMap;\n\nclass Main {\n\npublic static void main(String[] args) throws Exception {\n        String[] cats = new String[]{\"Hello\", \"How\", \"Are\", \"You\", \"I\", \"Am\", \"Fine\", \"Thank\", \"You\", \"And\"};\n        Integer age;\n        HashMap<String, Integer> hMap = new HashMap<>();\n        for (int i = 0; i < cats.length; i++) {\n            hMap.put(cats[i], i);\n        }\n        System.out.println(\"HashMap ordered by hash:\");\n        System.out.println(hMap);\n\n    }\n}",
            "time": "0.13299",
            "energy": "5.98687360454",
            "carbon": "2.46240111355",
            "samples": [
                {
                    "time": "0.1463",
                    "carbon": "2.708973206282191",
                    "energy": "6.586368116416706"
                },
                {
                    "time": "0.1332",
                    "carbon": "2.466236694804506",
                    "energy": "5.996199112094592"
                },
                {
                    "time": "0.1294",
                    "carbon": "2.395881106989766",
                    "energy": "5.8251424920733434"
                },
                {
                    "time": "0.1337",
                    "carbon": "2.475401642126043",
                    "energy": "6.0184819891224"
                },
                {
                    "time": "0.1299",
                    "carbon": "2.4050560596205974",
                    "energy": "5.847449695163135"
                },
                {
                    "time": "0.1331",
                    "carbon": "2.46463028963766",
                    "energy": "5.992293434567616"
                },
                {
                    "time": "0.1306",
                    "carbon": "2.418076696661551",
                    "energy": "5.879106969758208"
                },
                {
                    "time": "0.1282",
                    "carbon": "2.3737102398990855",
                    "energy": "5.771238122779201"
                },
                {
                    "time": "0.1317",
                    "carbon": "2.438588946222973",
                    "energy": "5.928978716807618"
                },
                {
                    "time": "0.1338",
                    "carbon": "2.477456253227292",
                    "energy": "6.023477396613888"
                }
            ]
        }
    },
    "12": {
        "before": {
            "code": "class Main {\n    public static void main(String[] args) throws Exception {\n        System.out.println(\"a\"+ \"b\" + \"c\");\n    }\n}",
            "time": "0.12932",
            "energy": "2.39437950528",
            "carbon": "5.8214916248",
            "samples": [
                {
                    "time": "0.1353",
                    "carbon": "2.5051176773666994",
                    "energy": "6.090731041494529"
                },
                {
                    "time": "0.1323",
                    "carbon": "2.4495338316641884",
                    "energy": "5.955589184692896"
                },
                {
                    "time": "0.1353",
                    "carbon": "2.505208327645553",
                    "energy": "6.090951440908225"
                },
                {
                    "time": "0.1292",
                    "carbon": "2.3924317056493316",
                    "energy": "5.81675590967501"
                },
                {
                    "time": "0.1284",
                    "carbon": "2.3773134387937986",
                    "energy": "5.779998635530752"
                },
                {
                    "time": "0.1247",
                    "carbon": "2.3087756019090375",
                    "energy": "5.613361541232768"
                },
                {
                    "time": "0.1166",
                    "carbon": "2.1588006053556983",
                    "energy": "5.248725031256257"
                },
                {
                    "time": "0.1243",
                    "carbon": "2.301362702317942",
                    "energy": "5.595338444731199"
                },
                {
                    "time": "0.1361",
                    "carbon": "2.519838641216215",
                    "energy": "6.126522346744991"
                },
                {
                    "time": "0.131",
                    "carbon": "2.425412520865801",
                    "energy": "5.89694267168928"
                }
            ]
        },
        "after": {
            "code": "class Main {\n    public static void main(String[] args) throws Exception {\n        StringBuilder sb = new StringBuilder(100);\n        System.out.println(sb.append(\"a\").append(\"b\").append(\"c\"));\n    }\n}",
            "time": "0.12907",
            "energy": "5.81016025675",
            "carbon": "2.3897189136",
            "samples": [
                {
                    "time": "0.1329",
                    "carbon": "2.4606387678321577",
                    "energy": "5.982588786365567"
                },
                {
                    "time": "0.1286",
                    "carbon": "2.381073574328928",
                    "energy": "5.789140710743808"
                },
                {
                    "time": "0.1363",
                    "carbon": "2.523592297025115",
                    "energy": "6.135648667700256"
                },
                {
                    "time": "0.1353",
                    "carbon": "2.5051850261642556",
                    "energy": "6.0908947876592645"
                },
                {
                    "time": "0.1283",
                    "carbon": "2.3754161173301576",
                    "energy": "5.775385648748256"
                },
                {
                    "time": "0.1149",
                    "carbon": "2.127323704454749",
                    "energy": "5.172194759189761"
                },
                {
                    "time": "0.125",
                    "carbon": "2.31438054904776",
                    "energy": "5.6269889352"
                },
                {
                    "time": "0.1182",
                    "carbon": "2.1884170463330976",
                    "energy": "5.320731938568192"
                },
                {
                    "time": "0.1286",
                    "carbon": "2.380983269269551",
                    "energy": "5.78892115066752"
                },
                {
                    "time": "0.1426",
                    "carbon": "2.6401787842164097",
                    "energy": "6.41910718263168"
                }
            ]
        }
    },
    "13": {
        "before": {
            "code": "import java.util.Set;\nimport java.util.Arrays;\nimport java.util.HashSet;\n\nclass Main {\n    public static void main(String[] args) throws Exception {\n        Set<String> set = new HashSet<>();\n        set.addAll(Arrays.asList(\"one\", \"two\", \"three\"));\n    }\n}",
            "time": "0.13389",
            "energy": "6.02722911686",
            "carbon": "2.47899933576",
            "samples": [
                {
                    "time": "0.1234",
                    "carbon": "2.2849327329511278",
                    "energy": "5.555392008147648"
                },
                {
                    "time": "0.1402",
                    "carbon": "2.5959403876574134",
                    "energy": "6.311549690390016"
                },
                {
                    "time": "0.1323",
                    "carbon": "2.449741614511221",
                    "energy": "5.956094370316609"
                },
                {
                    "time": "0.1327",
                    "carbon": "2.457008243321494",
                    "energy": "5.973761836424736"
                },
                {
                    "time": "0.134",
                    "carbon": "2.4809552768396363",
                    "energy": "6.031984626403201"
                },
                {
                    "time": "0.1336",
                    "carbon": "2.4735548583714726",
                    "energy": "6.013991875447296"
                },
                {
                    "time": "0.1353",
                    "carbon": "2.5050223667915867",
                    "energy": "6.09049931143104"
                },
                {
                    "time": "0.1348",
                    "carbon": "2.4957646285971142",
                    "energy": "6.067990830530304"
                },
                {
                    "time": "0.1375",
                    "carbon": "2.545752146147892",
                    "energy": "6.18952624884"
                },
                {
                    "time": "0.1351",
                    "carbon": "2.5013211024547877",
                    "energy": "6.0815003706656645"
                }
            ]
        },
        "after": {
            "code": "import java.util.Set;\nimport java.util.Arrays;\nimport java.util.HashSet;\n\nclass Main {\n    public static void main(String[] args) throws Exception {\n        Set<String> set = new HashSet<>(Arrays.asList(\"one\", \"two\", \"three\"));\n    }\n}",
            "time": "0.1305",
            "energy": "5.87460027494",
            "carbon": "2.41622309308",
            "samples": [
                {
                    "time": "0.1353",
                    "carbon": "2.5050806956608986",
                    "energy": "6.090641127305856"
                },
                {
                    "time": "0.132",
                    "carbon": "2.444114338772351",
                    "energy": "5.942412688481281"
                },
                {
                    "time": "0.128",
                    "carbon": "2.3699466598358017",
                    "energy": "5.762087672832"
                },
                {
                    "time": "0.1324",
                    "carbon": "2.451534132864153",
                    "energy": "5.960452547688192"
                },
                {
                    "time": "0.1283",
                    "carbon": "2.375530018312934",
                    "energy": "5.775662577955104"
                },
                {
                    "time": "0.1382",
                    "carbon": "2.55873706113969",
                    "energy": "6.221096671868928"
                },
                {
                    "time": "0.1279",
                    "carbon": "2.3680080255897042",
                    "energy": "5.757374241647713"
                },
                {
                    "time": "0.1284",
                    "carbon": "2.3773262786916534",
                    "energy": "5.780029853371391"
                },
                {
                    "time": "0.1283",
                    "carbon": "2.3754159034985256",
                    "energy": "5.775385128856128"
                },
                {
                    "time": "0.1262",
                    "carbon": "2.3365378164688533",
                    "energy": "5.680860239408833"
                }
            ]
        }
    },
    "14": {
        "before": {
            "code": "import java.util.ArrayList;\nimport java.util.List;\n\nclass main {\n    public static void main(String[] args) throws Exception {\n        List<String> names = new ArrayList<>();\n            names.add(\"Alice\");\n            names.add(\"Bob\");\n            names.add(\"Charlie\");\n    for (int i = 0; i < names.size(); i++);\n    }\n}",
            "time": "0.13274",
            "energy": "5.97540380129",
            "carbon": "2.45768358347",
            "samples": [
                {
                    "time": "0.1244",
                    "carbon": "2.303216233963276",
                    "energy": "5.59984496465664"
                },
                {
                    "time": "0.1374",
                    "carbon": "2.54411022337471",
                    "energy": "6.185534216811841"
                },
                {
                    "time": "0.1296",
                    "carbon": "2.3996337045848626",
                    "energy": "5.834266240177152"
                },
                {
                    "time": "0.1343",
                    "carbon": "2.4866304487530355",
                    "energy": "6.045782758942464"
                },
                {
                    "time": "0.1341",
                    "carbon": "2.4828109079682674",
                    "energy": "6.036496250834592"
                },
                {
                    "time": "0.1368",
                    "carbon": "2.532847508961907",
                    "energy": "6.158151006471936"
                },
                {
                    "time": "0.137",
                    "carbon": "2.5364975294841425",
                    "energy": "6.167025357364801"
                },
                {
                    "time": "0.1301",
                    "carbon": "2.4087511160623376",
                    "energy": "5.856433542578015"
                },
                {
                    "time": "0.1329",
                    "carbon": "2.4605906288817825",
                    "energy": "5.982471745396992"
                },
                {
                    "time": "0.1308",
                    "carbon": "2.4217475326848596",
                    "energy": "5.888031929698176"
                }
            ]
        },
        "after": {
            "code": "import java.util.ArrayList;\nimport java.util.List;\n\nclass main {\n    public static void main(String[] args) throws Exception {\n        List<String> names = new ArrayList<>();\n            names.add(\"Alice\");\n            names.add(\"Bob\");\n            names.add(\"Charlie\");\n    int size = names.size();\n    for (int i = 0; i < size; i++);\n    }\n}",
            "time": "0.13151",
            "energy": "5.92002466828",
            "carbon": "2.43490614606",
            "samples": [
                {
                    "time": "0.1299",
                    "carbon": "2.4052749393793516",
                    "energy": "5.847981860878559"
                },
                {
                    "time": "0.1303",
                    "carbon": "2.4124481027665",
                    "energy": "5.865422083069536"
                },
                {
                    "time": "0.1301",
                    "carbon": "2.408751622002758",
                    "energy": "5.85643477267872"
                },
                {
                    "time": "0.1389",
                    "carbon": "2.571842991446557",
                    "energy": "6.252961321289951"
                },
                {
                    "time": "0.1339",
                    "carbon": "2.4792427006285203",
                    "energy": "6.027820813587455"
                },
                {
                    "time": "0.1261",
                    "carbon": "2.334682226951001",
                    "energy": "5.676348716146368"
                },
                {
                    "time": "0.125",
                    "carbon": "2.3143295772310326",
                    "energy": "5.626865006640001"
                },
                {
                    "time": "0.1299",
                    "carbon": "2.4050391727549374",
                    "energy": "5.847408637867584"
                },
                {
                    "time": "0.1368",
                    "carbon": "2.532794765381497",
                    "energy": "6.158022770195713"
                },
                {
                    "time": "0.1342",
                    "carbon": "2.4846553620747045",
                    "energy": "6.040980700400449"
                }
            ]
        }
    },
    "15": {
        "before": {
            "code": "import java.util.logging.Logger;\n\nclass main {\n    private final static Logger LOG = Logger.getGlobal();\n    \n    public static void main(String[] args) throws Exception {\n        LOG.severe(\"Log Log\");\n    }\n}",
            "time": "0.30562",
            "energy": "13.7597546842",
            "carbon": "5.65938710162",
            "samples": [
                {
                    "time": "0.2991",
                    "carbon": "5.5388150322492935",
                    "energy": "13.466605962191329"
                },
                {
                    "time": "0.302",
                    "carbon": "5.592668179773744",
                    "energy": "13.597539945960962"
                },
                {
                    "time": "0.3038",
                    "carbon": "5.625646014125038",
                    "energy": "13.677719460552"
                },
                {
                    "time": "0.3018",
                    "carbon": "5.588661119425187",
                    "energy": "13.5877975186608"
                },
                {
                    "time": "0.301",
                    "carbon": "5.573803932603806",
                    "energy": "13.55167501240896"
                },
                {
                    "time": "0.294",
                    "carbon": "5.444106759254588",
                    "energy": "13.236340285082878"
                },
                {
                    "time": "0.3219",
                    "carbon": "5.960774643021278",
                    "energy": "14.492522837396736"
                },
                {
                    "time": "0.3138",
                    "carbon": "5.810777182313314",
                    "energy": "14.12783170997645"
                },
                {
                    "time": "0.3126",
                    "carbon": "5.788566309651997",
                    "energy": "14.07383007452467"
                },
                {
                    "time": "0.3062",
                    "carbon": "5.6700518437965055",
                    "energy": "13.785684035488707"
                }
            ]
        },
        "after": {
            "code": "class Main {\n    public static void main(String[] args) throws Exception {\n    }\n}",
            "time": "0.12911",
            "energy": "5.81193579022",
            "carbon": "2.39044919052",
            "samples": [
                {
                    "time": "0.129",
                    "carbon": "2.388512966042605",
                    "energy": "5.807228217949441"
                },
                {
                    "time": "0.1334",
                    "carbon": "2.4699485720568757",
                    "energy": "6.005223856204415"
                },
                {
                    "time": "0.126",
                    "carbon": "2.3328386138934296",
                    "energy": "5.671866311435521"
                },
                {
                    "time": "0.1344",
                    "carbon": "2.4883590228368835",
                    "energy": "6.049985467631616"
                },
                {
                    "time": "0.1313",
                    "carbon": "2.431047795429927",
                    "energy": "5.910643801191168"
                },
                {
                    "time": "0.1269",
                    "carbon": "2.3495010418554196",
                    "energy": "5.712377928167808"
                },
                {
                    "time": "0.123",
                    "carbon": "2.2772955890328443",
                    "energy": "5.53682370297312"
                },
                {
                    "time": "0.1278",
                    "carbon": "2.366156501872841",
                    "energy": "5.752872603629568"
                },
                {
                    "time": "0.131",
                    "carbon": "2.4254104103270353",
                    "energy": "5.896937540304"
                },
                {
                    "time": "0.1283",
                    "carbon": "2.3754213918437532",
                    "energy": "5.77539847275408"
                }
            ]
        }
    },
    "16": {
        "before": {
            "code": "public class Main {\n    public static void main(String[] args) {\n        int n = 1000;\n        long result = 0;\n\n        for (int i = 1; i <= n; i++) {\n            result += i * i;\n        }\n        \n        System.out.println(\"Result: \" + result);\n    }\n}\n\n",
            "time": "0.17204",
            "energy": "7.74459920533",
            "carbon": "3.18535365315",
            "samples": [
                {
                    "time": "0.1782",
                    "carbon": "3.299382890706735",
                    "energy": "8.021840239987199"
                },
                {
                    "time": "0.1698",
                    "carbon": "3.1438486892063375",
                    "energy": "7.643687549735807"
                },
                {
                    "time": "0.1715",
                    "carbon": "3.175340022103589",
                    "energy": "7.720252910536321"
                },
                {
                    "time": "0.1714",
                    "carbon": "3.173484988692424",
                    "energy": "7.715742739344576"
                },
                {
                    "time": "0.176",
                    "carbon": "3.258662870717236",
                    "energy": "7.9228370306764795"
                },
                {
                    "time": "0.1668",
                    "carbon": "3.0885296715637165",
                    "energy": "7.509189573459072"
                },
                {
                    "time": "0.1856",
                    "carbon": "3.4363924454466956",
                    "energy": "8.354953672372224"
                },
                {
                    "time": "0.1707",
                    "carbon": "3.1605222504130936",
                    "energy": "7.684226234896896"
                },
                {
                    "time": "0.1746",
                    "carbon": "3.232731988868242",
                    "energy": "7.859790879815809"
                },
                {
                    "time": "0.1558",
                    "carbon": "2.8846407138030496",
                    "energy": "7.013471222472768"
                }
            ]
        },
        "after": {
            "code": "public class Main {\n    public static void main(String[] args) {\n        int n = 1000;\n        \n        // Calculate the sum of squares using a mathematical formula\n        long result = (n * (n + 1) * (2 * n + 1)) / 6;\n\n        System.out.println(\"Result: \" + result);\n    }\n}\n\n",
            "time": "0.1712",
            "energy": "7.70699801508",
            "carbon": "3.1698882836",
            "samples": [
                {
                    "time": "0.1643",
                    "carbon": "3.0421939421877786",
                    "energy": "7.3965328037631375"
                },
                {
                    "time": "0.1759",
                    "carbon": "3.2571092126863297",
                    "energy": "7.919059598070337"
                },
                {
                    "time": "0.1777",
                    "carbon": "3.290262289587968",
                    "energy": "7.999665182562529"
                },
                {
                    "time": "0.1766",
                    "carbon": "3.2698896810823315",
                    "energy": "7.950132946954368"
                },
                {
                    "time": "0.1562",
                    "carbon": "2.892337339803693",
                    "energy": "7.032184147346689"
                },
                {
                    "time": "0.1697",
                    "carbon": "3.1420735526040176",
                    "energy": "7.639371632881152"
                },
                {
                    "time": "0.1711",
                    "carbon": "3.1679326504685172",
                    "energy": "7.702243254239041"
                },
                {
                    "time": "0.1742",
                    "carbon": "3.225317636288706",
                    "energy": "7.841764250641153"
                },
                {
                    "time": "0.1779",
                    "carbon": "3.2938266939024134",
                    "energy": "8.008331373455905"
                },
                {
                    "time": "0.1684",
                    "carbon": "3.117939837404311",
                    "energy": "7.580694960866305"
                }
            ]
        }
    },
    "17": {
        "before": {
            "code": "import java.util.List;\nimport java.util.stream.Collectors;\nimport java.util.stream.IntStream;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = IntStream.rangeClosed(1, 1000)\n                .boxed()\n                .collect(Collectors.toList());\n\n        long sum = numbers.parallelStream()\n                .mapToLong(Integer::intValue)\n                .sum();\n\n        System.out.println(\"Sum of numbers: \" + sum);\n    }\n}\n",
            "time": "0.21351",
            "energy": "9.61187156063",
            "carbon": "3.95336277289",
            "samples": [
                {
                    "time": "0.2139",
                    "carbon": "3.9605760710418987",
                    "energy": "9.629409363097249"
                },
                {
                    "time": "0.2202",
                    "carbon": "4.077210831293613",
                    "energy": "9.912985245061057"
                },
                {
                    "time": "0.2185",
                    "carbon": "4.045863369085167",
                    "energy": "9.836769679273441"
                },
                {
                    "time": "0.2141",
                    "carbon": "3.96426274132813",
                    "energy": "9.638372821123584"
                },
                {
                    "time": "0.2384",
                    "carbon": "4.414206439172654",
                    "energy": "10.732327836549121"
                },
                {
                    "time": "0.202",
                    "carbon": "3.740271040970528",
                    "energy": "9.09377836365312"
                },
                {
                    "time": "0.2073",
                    "carbon": "3.8383450213048103",
                    "energy": "9.332227136651618"
                },
                {
                    "time": "0.2023",
                    "carbon": "3.745778920770335",
                    "energy": "9.107169756310078"
                },
                {
                    "time": "0.2082",
                    "carbon": "3.855018927008824",
                    "energy": "9.372766659394175"
                },
                {
                    "time": "0.2102",
                    "carbon": "3.892094366877253",
                    "energy": "9.462908745142848"
                }
            ]
        },
        "after": {
            "code": "// 후 코드\nimport java.util.concurrent.ForkJoinPool;\nimport java.util.concurrent.ForkJoinTask;\nimport java.util.concurrent.RecursiveTask;\nimport java.util.stream.IntStream;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] numbers = IntStream.rangeClosed(1, 1000)\n                .toArray();\n\n        ForkJoinPool forkJoinPool = new ForkJoinPool();\n        long sum = forkJoinPool.invoke(new SumTask(numbers, 0, numbers.length));\n        \n        System.out.println(\"Sum of numbers: \" + sum);\n    }\n}\n\nclass SumTask extends RecursiveTask<Long> {\n    private int[] numbers;\n    private int start;\n    private int end;\n    \n    public SumTask(int[] numbers, int start, int end) {\n        this.numbers = numbers;\n        this.start = start;\n        this.end = end;\n    }\n\n    @Override\n    protected Long compute() {\n        if (end - start <= 100) {\n            long sum = 0;\n            for (int i = start; i < end; i++) {\n                sum += numbers[i];\n            }\n            return sum;\n        } else {\n            int mid = (start + end) / 2;\n            SumTask leftTask = new SumTask(numbers, start, mid);\n            SumTask rightTask = new SumTask(numbers, mid, end);\n            leftTask.fork();\n            return rightTask.compute() + leftTask.join();\n        }\n    }\n}\n\n\n",
            "time": "0.19774",
            "energy": "8.90190711416",
            "carbon": "3.66135439605",
            "samples": [
                {
                    "time": "0.1994",
                    "carbon": "3.6920944868481698",
                    "energy": "8.976645968510017"
                },
                {
                    "time": "0.2047",
                    "carbon": "3.7902094942449582",
                    "energy": "9.215194491235007"
                },
                {
                    "time": "0.1902",
                    "carbon": "3.521723746139911",
                    "energy": "8.562420972866304"
                },
                {
                    "time": "0.1975",
                    "carbon": "3.6568799245666357",
                    "energy": "8.8910282629872"
                },
                {
                    "time": "0.197",
                    "carbon": "3.6476261595627775",
                    "energy": "8.86852944216576"
                },
                {
                    "time": "0.2062",
                    "carbon": "3.8180651711723668",
                    "energy": "9.282920425899263"
                },
                {
                    "time": "0.202",
                    "carbon": "3.740306054025324",
                    "energy": "9.093863491430401"
                },
                {
                    "time": "0.1912",
                    "carbon": "3.5402412371794965",
                    "energy": "8.607442832918785"
                },
                {
                    "time": "0.1876",
                    "carbon": "3.4735855387124936",
                    "energy": "8.445381810630911"
                },
                {
                    "time": "0.2016",
                    "carbon": "3.7328121480786556",
                    "energy": "9.07564344293376"
                }
            ]
        }
    },
    "18": {
        "before": {
            "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = new ArrayList<>();\n\n        for (int i = 0; i < 1000000; i++) {\n            numbers.add(i);\n        }\n\n        int sum = calculateSum(numbers);\n        System.out.println(\"Sum of numbers: \" + sum);\n    }\n\n    private static int calculateSum(List<Integer> numbers) {\n        int sum = 0;\n        for (int number : numbers) {\n            sum += number;\n        }\n        return sum;\n    }\n}\n",
            "time": "0.41486",
            "energy": "18.6983017354",
            "carbon": "7.69061150379",
            "samples": [
                {
                    "time": "0.4367",
                    "carbon": "8.09539310938694",
                    "energy": "19.68245346313382"
                },
                {
                    "time": "0.4262",
                    "carbon": "7.900781847550869",
                    "energy": "19.209292116583683"
                },
                {
                    "time": "0.3899",
                    "carbon": "7.228213476419905",
                    "energy": "17.57406631757818"
                },
                {
                    "time": "0.4329",
                    "carbon": "8.025347811437099",
                    "energy": "19.51215125562144"
                },
                {
                    "time": "0.4111",
                    "carbon": "7.6208294183778476",
                    "energy": "18.528639480617183"
                },
                {
                    "time": "0.3933",
                    "carbon": "7.2908692342039325",
                    "energy": "17.726402222718047"
                },
                {
                    "time": "0.4197",
                    "carbon": "7.780223161567018",
                    "energy": "18.916175933788033"
                },
                {
                    "time": "0.4036",
                    "carbon": "7.48181315982219",
                    "energy": "18.190647118459008"
                },
                {
                    "time": "0.4105",
                    "carbon": "7.609714580010875",
                    "energy": "18.50161580357616"
                },
                {
                    "time": "0.4247",
                    "carbon": "7.87292923909905",
                    "energy": "19.141573642351204"
                }
            ]
        },
        "after": {
            "code": "public class Main {\n    public static void main(String[] args) {\n        int[] numbers = new int[1000000];\n\n        for (int i = 0; i < 1000000; i++) {\n            numbers[i] = i;\n        }\n\n        int sum = calculateSum(numbers);\n        System.out.println(\"Sum of numbers: \" + sum);\n    }\n\n    private static int calculateSum(int[] numbers) {\n        int sum = 0;\n        for (int number : numbers) {\n            sum += number;\n        }\n        return sum;\n    }\n}\n",
            "time": "0.2027",
            "energy": "9.12585444477",
            "carbon": "3.75346393314",
            "samples": [
                {
                    "time": "0.2012",
                    "carbon": "3.725684769882829",
                    "energy": "9.058314538980863"
                },
                {
                    "time": "0.2008",
                    "carbon": "3.718298702633832",
                    "energy": "9.040356680364289"
                },
                {
                    "time": "0.2056",
                    "carbon": "3.8071551522871125",
                    "energy": "9.2563947296064"
                },
                {
                    "time": "0.2011",
                    "carbon": "3.7238294628071755",
                    "energy": "9.053803702424448"
                },
                {
                    "time": "0.2014",
                    "carbon": "3.7294017723166495",
                    "energy": "9.067351744022975"
                },
                {
                    "time": "0.2115",
                    "carbon": "3.9164149276461107",
                    "energy": "9.522039697656481"
                },
                {
                    "time": "0.203",
                    "carbon": "3.7590150435414884",
                    "energy": "9.139350944666882"
                },
                {
                    "time": "0.2051",
                    "carbon": "3.797908242673162",
                    "energy": "9.233912576399616"
                },
                {
                    "time": "0.2084",
                    "carbon": "3.85901560955105",
                    "energy": "9.382483854974593"
                },
                {
                    "time": "0.1889",
                    "carbon": "3.4979156480165017",
                    "energy": "8.504535978644546"
                }
            ]
        }
    },
    "19": {
        "before": {
            "code": "public class Main {\n    public static void main(String[] args) {\n        String str = new String(\"hello\");\n        System.out.println(str);\n    }\n}",
            "time": "0.13546",
            "energy": "6.09772140867",
            "carbon": "2.50799281539",
            "samples": [
                {
                    "time": "0.1373",
                    "carbon": "2.542061667114182",
                    "energy": "6.180553530547488"
                },
                {
                    "time": "0.1273",
                    "carbon": "2.356902421038162",
                    "energy": "5.730373014923807"
                },
                {
                    "time": "0.1317",
                    "carbon": "2.4383705454604083",
                    "energy": "5.928447715682977"
                },
                {
                    "time": "0.1318",
                    "carbon": "2.440230277778636",
                    "energy": "5.932969311399553"
                },
                {
                    "time": "0.1301",
                    "carbon": "2.408742081411989",
                    "energy": "5.856411576494017"
                },
                {
                    "time": "0.1504",
                    "carbon": "2.784645464306749",
                    "energy": "6.770351238285312"
                },
                {
                    "time": "0.1335",
                    "carbon": "2.4716990193556065",
                    "energy": "6.00947974557648"
                },
                {
                    "time": "0.1424",
                    "carbon": "2.6364961209538564",
                    "energy": "6.410153466943488"
                },
                {
                    "time": "0.1309",
                    "carbon": "2.4235595337716904",
                    "energy": "5.892437475739583"
                },
                {
                    "time": "0.1392",
                    "carbon": "2.5772210226682333",
                    "energy": "6.266037011106816"
                }
            ]
        },
        "after": {
            "code": "public class Main {\n    public static void main(String[] args) {\n        String str = \"hello\";\n        System.out.println(str);\n    }\n}",
            "time": "0.13224",
            "energy": "5.95281782187",
            "carbon": "2.44839397014",
            "samples": [
                {
                    "time": "0.1313",
                    "carbon": "2.4309999442550403",
                    "energy": "5.910527459895552"
                },
                {
                    "time": "0.1344",
                    "carbon": "2.4883602174940465",
                    "energy": "6.049988372219904"
                },
                {
                    "time": "0.1416",
                    "carbon": "2.6217584484039294",
                    "energy": "6.374321537573375"
                },
                {
                    "time": "0.1308",
                    "carbon": "2.4217098916509707",
                    "energy": "5.887940412475008"
                },
                {
                    "time": "0.1214",
                    "carbon": "2.2476759411920675",
                    "energy": "5.464808998765056"
                },
                {
                    "time": "0.1309",
                    "carbon": "2.4235662241629115",
                    "energy": "5.8924537421903995"
                },
                {
                    "time": "0.1269",
                    "carbon": "2.3495651258456145",
                    "energy": "5.7125337365563205"
                },
                {
                    "time": "0.1394",
                    "carbon": "2.580939105426793",
                    "energy": "6.27507684275904"
                },
                {
                    "time": "0.1359",
                    "carbon": "2.5161560282310393",
                    "energy": "6.117568753296959"
                },
                {
                    "time": "0.1298",
                    "carbon": "2.403208774703348",
                    "energy": "5.84295836300352"
                }
            ]
        }
    },
    "20": {
        "before": {
            "code": "import java.util.Vector;\n\npublic class Main {\n    public static void main(String[] args) {\n        Vector<Integer> v = new Vector();\n\n        for(int i = 0; i < 100; ++i) {\n            v.add(i);\n        }\n\n        System.out.println(v);\n    }\n}",
            "time": "0.13626",
            "energy": "6.13374974632",
            "carbon": "2.52281127066",
            "samples": [
                {
                    "time": "0.1363",
                    "carbon": "2.5235529217828003",
                    "energy": "6.135552934069537"
                },
                {
                    "time": "0.1356",
                    "carbon": "2.5106175704522657",
                    "energy": "6.104103015930624"
                },
                {
                    "time": "0.1377",
                    "carbon": "2.549458577332476",
                    "energy": "6.198537751841664"
                },
                {
                    "time": "0.1277",
                    "carbon": "2.3643163292878997",
                    "energy": "5.748398563792608"
                },
                {
                    "time": "0.1397",
                    "carbon": "2.5864829387183588",
                    "energy": "6.288555649692095"
                },
                {
                    "time": "0.1417",
                    "carbon": "2.6235761224456304",
                    "energy": "6.378740876356991"
                },
                {
                    "time": "0.1378",
                    "carbon": "2.551318074263688",
                    "energy": "6.203058775258176"
                },
                {
                    "time": "0.1371",
                    "carbon": "2.5383548523215382",
                    "energy": "6.171541094873665"
                },
                {
                    "time": "0.1292",
                    "carbon": "2.3920956447672284",
                    "energy": "5.81593883969664"
                },
                {
                    "time": "0.1398",
                    "carbon": "2.588339675227086",
                    "energy": "6.293069961651073"
                }
            ]
        },
        "after": {
            "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> v = new ArrayList();\n\n        for(int i = 0; i < 100; ++i) {\n            v.add(i);\n        }\n\n        System.out.println(v);\n    }\n}",
            "time": "0.13568",
            "energy": "6.10761736813",
            "carbon": "2.51206302351",
            "samples": [
                {
                    "time": "0.1399",
                    "carbon": "2.59020279246283",
                    "energy": "6.297599787169536"
                },
                {
                    "time": "0.1351",
                    "carbon": "2.501323354103542",
                    "energy": "6.081505845133824"
                },
                {
                    "time": "0.1351",
                    "carbon": "2.5013244799279186",
                    "energy": "6.081508582367904"
                },
                {
                    "time": "0.1345",
                    "carbon": "2.490213842916412",
                    "energy": "6.05449512014688"
                },
                {
                    "time": "0.1357",
                    "carbon": "2.512432268850972",
                    "energy": "6.108515119987776"
                },
                {
                    "time": "0.1371",
                    "carbon": "2.5383572134694212",
                    "energy": "6.171546835568736"
                },
                {
                    "time": "0.1363",
                    "carbon": "2.523539670499329",
                    "energy": "6.135520716020737"
                },
                {
                    "time": "0.1387",
                    "carbon": "2.567972855730952",
                    "energy": "6.243551800950527"
                },
                {
                    "time": "0.1301",
                    "carbon": "2.4087510437851347",
                    "energy": "5.856433366849343"
                },
                {
                    "time": "0.1343",
                    "carbon": "2.4865127133563183",
                    "energy": "6.045496507066177"
                }
            ]
        }
    }
}

