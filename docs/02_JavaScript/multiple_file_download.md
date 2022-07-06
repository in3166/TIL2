# 서버에서 클라이언트로 여러 파일 전송하기

- server

```go
func downloadFile(w http.ResponseWriter, r *http.Request) {

	err := r.ParseForm()
	if err != nil {
		fmt.Println(w, err)
		return
	}

	fileUrl := r.PostFormValue("fileUrl")
	dec := r.PostFormValue("dec")
	fmt.Println("dec: ", dec, "file: ", fileUrl)
	var Myregex = `(.\/Users\/)([a-zA-Z0-9-]+\/)`
	var re = regexp.MustCompile(Myregex)
	fileName := re.ReplaceAllString(fileUrl, "")

	fmt.Println(fileUrl)
	fmt.Println(fileName)

	f, err := os.Open(fileUrl)
	if err != nil {
		fmt.Println("1:", err)
	}
	defer f.Close()
	downloadBytes, err := ioutil.ReadFile(fileUrl)
	mime := http.DetectContentType(downloadBytes)
	fileSize := len(string(downloadBytes))

	w.Header().Set("Content-Type", mime)
	w.Header().Set("Content-Disposition", "attachment; filename="+string(fileName)+"")
	w.Header().Set("Expires", "0")
	w.Header().Set("Content-Transfer-Encoding", "binary")
	w.Header().Set("Content-Length", strconv.Itoa(fileSize))
	w.Header().Set("Content-Control", "private, no-transform, no-store, must-revalidate")

	http.ServeContent(w, r, string(fileName), time.Now(), bytes.NewReader(downloadBytes))
	return
}
```

<br>
<br>


- client
  - interval 없이 단순 loop문을 돌리면 모든 경로를 다운로드 하지 못함.
  - ajax를 단순히 loop 문 안에 두기보단 promise 사용 권장.
  - 다른 옵션: async-await?, zip 파일로 압축해서 한번에 보내기, a element를 동적으로 생성하고 click 이벤트 발생 ...
  
```js
$("#btn_download").click(function (e) {

});

$("#submit_download").click(function (e) {
  let fileUrl = $("#fileUrls").val();
  fileUrl = fileUrl.split(";");
  console.log(fileUrl);

  let dec = false;
  if ($("#input_dec").is(":checked")) {
    dec = true;
  }

  const promises = [];
  for (let i = 0; i < fileUrl.length-1; i++) {
    console.log(i);
    promises.push(submitDownload(dec, fileUrl[i]));
    
  }

    Promise.all(promises)
    .then((result) => {
      console.log("re: ", result);
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex === result.length - 1) clearInterval(intervalId);
        if (result[currentIndex] != "") {
          window.location.href = result[currentIndex];
        }
        currentIndex++;
      }, 1000);
    })
    .catch((err) => {
      alert(err);
    });
});

function submitDownload(dec, fileUrl) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: "GET",
      url: "/downloadFile",
      data: {
        dir: fileUrl,
        dec: dec,
      },
      success: function () {
        console.log("a: ", fileUrl);
        // window.open(fileUrl, '_blank');
        //window.location.href = "/downloadFile?dir=" + fileUrl + "&dec=" + dec;
        resolve("/downloadFile?dir=" + fileUrl + "&dec=" + dec);
      },
      error: function () {
        //alert("Download Error.");
        reject("Download file error: ", fileUrl);
      },
    });
  });
}
```
