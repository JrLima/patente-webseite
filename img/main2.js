var fs = require('fs'),
    request = require('request');
//var a=["http://www.landesarchiv-bw.de/plink/?f=2-316092-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316102-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316109-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316115-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316128-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316133-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316141-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316146-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316153-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316159-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316164-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316170-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316175-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316183-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316195-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316198-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316200-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316212-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316238-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316249-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316260-2&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316277-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316301-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316307-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316316-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316323-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316330-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316335-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316349-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316354-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316388-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316406-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316415-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316420-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316443-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316463-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316481-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316486-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316490-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316496-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316508-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316513-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316518-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316523-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316546-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316551-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316559-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316569-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316577-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316598-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316618-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316623-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316639-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316646-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316651-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316657-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316668-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316674-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316683-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316691-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316697-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316715-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316720-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316725-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316743-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316776-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316798-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316803-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316807-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316824-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316841-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316850-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316855-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316862-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316867-2&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316872-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316896-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316901-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316930-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316935-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316940-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316952-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316957-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316962-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316967-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316976-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316981-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316986-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316989-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-316998-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317003-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317008-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317013-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317018-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317023-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317028-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317033-4&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317034-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317039-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317050-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317055-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317060-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317068-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317073-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317094-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317098-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317112-1&ext=456788&format=png","http://www.landesarchiv-bw.de/plink/?f=2-317124-1&ext=456788&format=png"];
var a = [
[
  "labw-2-57417",
  "http://www.landesarchiv-bw.de/plink/?f=2-316092-1&ext=456788&format=png"
],
[
  "labw-2-57725",
  "http://www.landesarchiv-bw.de/plink/?f=2-316490-1&ext=456788&format=png"
],
[
  "labw-2-57466",
  "http://www.landesarchiv-bw.de/plink/?f=2-316102-1&ext=456788&format=png"
],
[
  "labw-2-57425",
  "http://www.landesarchiv-bw.de/plink/?f=2-316096-1&ext=456788&format=png"
],
[
  "labw-2-57523",
  "http://www.landesarchiv-bw.de/plink/?f=2-316128-1&ext=456788&format=png"
],
[
  "labw-2-57595",
  "http://www.landesarchiv-bw.de/plink/?f=2-316170-1&ext=456788&format=png"
],
[
  "labw-2-57709",
  "http://www.landesarchiv-bw.de/plink/?f=2-316420-1&ext=456788&format=png"
],
[
  "labw-2-57723",
  "http://www.landesarchiv-bw.de/plink/?f=2-316481-1&ext=456788&format=png"
],
[
  "labw-2-57724",
  "http://www.landesarchiv-bw.de/plink/?f=2-316486-1&ext=456788&format=png"
],
[
  "labw-2-57728",
  "http://www.landesarchiv-bw.de/plink/?f=2-316508-1&ext=456788&format=png"
],
[
  "labw-2-57738",
  "http://www.landesarchiv-bw.de/plink/?f=2-316559-1&ext=456788&format=png"
],
[
  "labw-2-57740",
  "http://www.landesarchiv-bw.de/plink/?f=2-316577-1&ext=456788&format=png"
],
[
  "labw-2-57744",
  "http://www.landesarchiv-bw.de/plink/?f=2-316598-1&ext=456788&format=png"
],
[
  "labw-2-57748",
  "http://www.landesarchiv-bw.de/plink/?f=2-316618-1&ext=456788&format=png"
],
[
  "labw-2-57754",
  "http://www.landesarchiv-bw.de/plink/?f=2-316651-1&ext=456788&format=png"
],
[
  "labw-2-57760",
  "http://www.landesarchiv-bw.de/plink/?f=2-316683-1&ext=456788&format=png"
],
[
  "labw-2-57763",
  "http://www.landesarchiv-bw.de/plink/?f=2-316697-1&ext=456788&format=png"
],
[
  "labw-2-57879",
  "http://www.landesarchiv-bw.de/plink/?f=2-316743-1&ext=456788&format=png"
],
[
  "labw-2-58237",
  "http://www.landesarchiv-bw.de/plink/?f=2-316807-1&ext=456788&format=png"
],
[
  "labw-2-58473",
  "http://www.landesarchiv-bw.de/plink/?f=2-316855-1&ext=456788&format=png"
],
[
  "labw-2-57533",
  "http://www.landesarchiv-bw.de/plink/?f=2-316133-1&ext=456788&format=png"
],
[
  "labw-2-57766",
  "http://www.landesarchiv-bw.de/plink/?f=2-316715-1&ext=456788&format=png"
],
[
  "labw-2-57767",
  "http://www.landesarchiv-bw.de/plink/?f=2-316720-1&ext=456788&format=png"
],
[
  "labw-2-57559",
  "http://www.landesarchiv-bw.de/plink/?f=2-316141-1&ext=456788&format=png"
],
[
  "labw-2-57559",
  "http://www.landesarchiv-bw.de/plink/?f=2-316141-1&ext=456788&format=png"
],
[
  "labw-2-57570",
  "http://www.landesarchiv-bw.de/plink/?f=2-316146-1&ext=456788&format=png"
],
[
  "labw-2-57650",
  "http://www.landesarchiv-bw.de/plink/?f=2-316175-1&ext=456788&format=png"
],
[
  "labw-2-57706",
  "http://www.landesarchiv-bw.de/plink/?f=2-316406-1&ext=456788&format=png"
],
[
  "labw-2-57708",
  "http://www.landesarchiv-bw.de/plink/?f=2-316415-1&ext=456788&format=png"
],
[
  "labw-2-57714",
  "http://www.landesarchiv-bw.de/plink/?f=2-316443-1&ext=456788&format=png"
],
[
  "labw-2-57729",
  "http://www.landesarchiv-bw.de/plink/?f=2-316513-1&ext=456788&format=png"
],
[
  "labw-2-57730",
  "http://www.landesarchiv-bw.de/plink/?f=2-316518-1&ext=456788&format=png"
],
[
  "labw-2-57731",
  "http://www.landesarchiv-bw.de/plink/?f=2-316523-1&ext=456788&format=png"
],
[
  "labw-2-57736",
  "http://www.landesarchiv-bw.de/plink/?f=2-316551-1&ext=456788&format=png"
],
[
  "labw-2-57755",
  "http://www.landesarchiv-bw.de/plink/?f=2-316657-1&ext=456788&format=png"
],
[
  "labw-2-57758",
  "http://www.landesarchiv-bw.de/plink/?f=2-316674-1&ext=456788&format=png"
],
[
  "labw-2-57732",
  "http://www.landesarchiv-bw.de/plink/?f=2-316529-1&ext=456788&format=png"
],
[
  "labw-2-57762",
  "http://www.landesarchiv-bw.de/plink/?f=2-316691-1&ext=456788&format=png"
],
[
  "labw-2-57765",
  "http://www.landesarchiv-bw.de/plink/?f=2-316709-1&ext=456788&format=png"
],
[
  "labw-2-57768",
  "http://www.landesarchiv-bw.de/plink/?f=2-316725-1&ext=456788&format=png"
],
[
  "labw-2-58183",
  "http://www.landesarchiv-bw.de/plink/?f=2-316798-1&ext=456788&format=png"
],
[
  "labw-2-58185",
  "http://www.landesarchiv-bw.de/plink/?f=2-316803-1&ext=456788&format=png"
],
[
  "labw-2-58269",
  "http://www.landesarchiv-bw.de/plink/?f=2-316824-1&ext=456788&format=png"
],
[
  "labw-2-58451",
  "http://www.landesarchiv-bw.de/plink/?f=2-316850-1&ext=456788&format=png"
],
[
  "labw-2-58496",
  "http://www.landesarchiv-bw.de/plink/?f=2-316862-1&ext=456788&format=png"
],
[
  "labw-2-58497",
  "http://www.landesarchiv-bw.de/plink/?f=2-316867-1&ext=456788&format=png"
],
[
  "labw-2-58519",
  "http://www.landesarchiv-bw.de/plink/?f=2-316872-1&ext=456788&format=png"
]
];

var b=a.length;
var i=0;

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


for (i=0;i<b;i++)
{

	download
	(
	 a[i][1], a[i][0]+'.png'
	 , function()
	  {
	   console.log('fertig');
	  }
	);

}
