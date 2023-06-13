
// http://localhost:3000/public/login2.html
// http://localhost:3000/public/adduser2.html

// multer 불러오기
var multer =  require('multer');

// Express 기본 모듈 불러오기
var express = require('express')
, http = require('http')
, path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, static = require('serve-static')
, errorHandler = require('errorhandler');

// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');


// MYSQL 데이터베이스를 사용할 수 있도록 하는 mysql 모듈 불러오기
var mysql = require('mysql');  // mysql 모듈 로드

// MYSQL 데이터베이스 연결 설정
var pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'user333',
    password:'password333',
    database:'madang',
    debug:false
});


// 익스프레스 객체 생성
var app = express();

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 설정 파일에 들어있는 port 정보 사용하여 포트 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false}));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));


// 서버시작//
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
});

loginPoint = 0;

// 라우팅 함수 등록

// 라우터 객체 생성
var router = express.Router();

// router객체에 로그인 처리 함수 등록
router.route('/process/login').post(function(req, res){
    console.log('/process/login 호출됨.');

    //요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

    // pool 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
    if (pool) {
        authUser(paramId, paramPassword, function(err, rows){
            console.log('pool: True, authUser Call 할 것임');
            //에러 발생 시, 클라이언트로 에러 전송
            if(err) {
                console.error('사용자 로그인 중 에러 발생 : ' + err.stack);

                res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
                res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            // 조회된 레코드가 있으면 성공 응답 전송
            if(rows) {
                console.dir(rows);
                
                // 조회 결과에서 사용자 이름 확인
                var username = rows[0].name;
                var userage = rows[0].age;
                
                loginPoint = 1;

                console.log('loginPoint : ' + loginPoint)

                res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>로그인 성공</h1>');
                res.write('<div><p>사용자 아이디 : ' + paramId + '</div></p>');
                res.write('<div><p>사용자 이름 : ' + username + '</div></p>');
                res.write('<div><p>사용자 나이 : ' + userage + '</div></p>');
                res.write("<br><br><a href='/public/login3.html'>메인 페이지로</a>");
                res.end();
            }

            else {
                // 조회된 레코드가 없는 경우 실패 응답 전송
                res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
                res.write('<font color=red><h2>[DB연결: Node.js 실습 중입니다. 문] </h2></font>');
                res.write('<h1>로그인 실패</h1>');
                res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
                res.write("<br><br><a href='/public/login2.html'>다시 로그인하기</a>");
                res.end();
            }

        });

    }
    else {
        //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        console.log('pool: False, authUser Call 안함. DB 연결 실패 메시지 전송');
        res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
        res.write('<font color=red><h2>[DB연결: Node.js 실습 중입니다. 문] </h2></font>');
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
        res.end();
    }
})

app.use('/', router);


var errorHandler = expressErrorHandler({
  static: {
      '404': './public/404.html'
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


// 로그아웃 함수
// 로그아웃 함수
// 로그아웃 함수
router.route('/process/logout').post(function(req, res) {
    console.log('/process/logout 호출됨.');

    console.log('현재 로그인 point : ' + loginPoint);

    loginPoint = 0;

    console.log('로그아웃 후 loginPoint : ' + loginPoint);

    res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
    res.write('<h1>로그아웃 성공</h1>');
    res.write("<br><br><a href='/public/login2.html'>메인 페이지로</a>");
    res.end();

});




// router 객체에 사용자 추가 라우팅 함수 등록
router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramAge = req.body.age || req.query.age;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramAge);

    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if(pool) {
        addUser(paramId, paramName, paramAge, paramPassword, function(err, addedUser){
            if(err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);

                res.writeHead('200', {"Content-Type":"text/html;charser=utf8"});
                res.write('<h2>사용자 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            // 결과 객체 있으면 성공 응답 전송
            if(addedUser) {
                console.dir(addedUser);

                console.log('inserted ' + addedUser.affectedRows + ' rows');

                var insertId = addedUser.insertId;
                console.log('추가한 레코드의 아이디 :' + insertId);

                res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();
            }
            else {
              res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
              res.write('<h2>사용자 추가 실패</h2>');
              res.end();
            }
        });
    }
    else {
        //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }

});

app.use('/', router);


/// 가장 가까운 매장 찾기 라우터
/// 가장 가까운 매장 찾기 라우터
/// 가장 가까운 매장 찾기 라우터
router.route('/process/distance').post(function(req, res) {
    console.log('/process/distance 호출됨.');

    var paramLongitude = req.body.Longitude || req.query.Longitude;
    var paramLatitude = req.body.Latitude || req.query.Latitude;

    console.log('요청 파라미터 : ' + paramLongitude + ', ' + paramLatitude);

    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if(pool) {
        locationDistance(paramLongitude, paramLatitude, function(err, locdist){
            if(err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);

                res.writeHead('200', {"Content-Type":"text/html;charser=utf8"});
                res.write('<h2>거리 측정 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            // 결과 객체 있으면 성공 응답 전송
            if(locdist) {
                console.dir(locdist);

                var locationDist = locdist[0];
                var locationName = locdist[1];
                var locationAddress = locdist[2];
                var locationHours = locdist[3];
                var locationTEL = locdist[4];
                var locationLatitude = locdist[5];
                var locationLongitude = locdist[6];

                console.dir(locationName)
                console.log(locdist[1])
                res.render('findnear.ejs', {marketLatitude: locationLatitude, 
                                            marketLongitude: locationLongitude,
                                            myLatitude: paramLatitude, 
                                            myLongitude: paramLongitude,
                                            loginPoint: loginPoint,
                                            marketName: locationName,
                                            marketAddress: locationAddress,
                                            marketHours: locationHours,
                                            marketTEL: locationTEL,
                                            marketDistance: locationDist});
                /*
                res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
                res.write('<h2>거리 측정 성공</h2>');
                res.write('<div><p>매장 까지의 거리 : ' + locationDist + 'km</div></p>');
                res.write('<div><p>매장 이름 : ' + locationName + '</div></p>');
                res.write('<div><p>매장 주소 : ' + locationAddress + '</div></p>');
                res.write('<div><p>매장 운영시간 : ' + locationHours + '</div></p>');
                res.write('<div><p>매장 번호 : ' + locationTEL + '</div></p>');
                res.write('<div><p>매장 Latitude : ' + locationLatitude + '</div></p>');
                res.write('<div><p>매장 Longitude : ' + locationLongitude + '</div></p>');
                res.write("<br><br><a href='/public/distance.html'>현재위치 변경</a>");
                res.write("<br><br><a href='/public/login2.html'>메인 화면으로</a>");
                res.end(); */
            }
            else {
              res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
              res.write('<h2>거리 측정 실패</h2>');
              res.end();
            }
        });
    }
    else {
        //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }

});

app.use('/', router);



// 메뉴판 라우터
// 메뉴판 라우터 
// 메뉴판 라우터  
// 메뉴판 라우터
router.route('/process/menu').post(function(req, res){
    console.log('/process/menu 호출됨.');

   // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
   if(pool) {
    menuboard(function(err, locdist){
        if(err) {
            console.error('메뉴판 보여주는중 에러 발생 : ' + err.stack);

            res.writeHead('200', {"Content-Type":"text/html;charser=utf8"});
            res.write('<h2>메뉴판 보여주는중 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();

            return;
        }

        // 결과 객체 있으면 성공 응답 전송
        if(locdist) {
            console.dir(locdist);

            var menuCount = locdist.length;
            var menuName = [];
            var menuPrice = [];
            var menuSet = [];
            var menuEvent = [];
            console.log(menuCount);

            for(var i=0; i<menuCount;i++){
                menuName.push(locdist[i]['menuName']);
                menuPrice.push(locdist[i]['menuPrice']);
                menuSet.push(locdist[i]['menuSet_price']);
                menuEvent.push(locdist[i]['menuEvent_price']);
            }
            console.log(menuName);

            res.render('menu.ejs', {menuCount: menuCount, menuName: menuName, menuPrice: menuPrice, 
                                    menuSet_price: menuSet, menuEvent_price: menuEvent,
                                    loginPoint: loginPoint});
        }
        else {
          res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
          res.write('<h2>메뉴판 보여주는중 에러 발생</h2>');
          res.end();
        }
    });
    }
    else {
        //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
});


var menuboard = function(callback){
    console.log('메뉴판 함수 호출됨.');

    pool.getConnection(function(err, conn){
        if(err) {
            if (conn) {
                conn.release(); //반드시 해제해야 함
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var columns = ['name', 'price', 'set_price', 'event_price'];
        var tablename = 'menu';

        var exec = conn.query("select ?? from ??", [columns, tablename], function(err, rows){
            conn.release(); 
            var dist = [];

            console.log('실행 대상 SQL : ' + exec.sql);

            if(rows.length > 0) {
                for (var i=0; i<rows.length; i++){
                    dist.push({menuName: rows[i]['name'], menuPrice: rows[i]['price'], menuSet_price: rows[i]['set_price'],
                               menuEvent_price: rows[i]['event_price']});
                }
                callback(null, dist);
            }
            else {
                console.log('데이터가 없음.');
                callback(null, null);
            }
        });

        conn.on('error', function(err) {
            console.log('데이터베이스 연결 시 에러 발생함.');
            console.dir(err);

            callback(err, null);
        });
        
    });
}


// 매장정보 라우터
// 매장정보 라우터 
// 매장정보 라우터  
// 매장정보 라우터 
router.route('/process/market').post(function(req, res){
    console.log('/process/market 호출됨.');

   // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
   if(pool) {
    marketInformation(function(err, locdist){
        if(err) {
            console.error('매장정보 조회중 에러 발생 : ' + err.stack);

            res.writeHead('200', {"Content-Type":"text/html;charser=utf8"});
            res.write('<h2>매장 정보 조회중 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();

            return;
        }

        // 결과 객체 있으면 성공 응답 전송
        if(locdist) {
            console.dir(locdist);

            var marketCount = locdist.length;
            var marketName = [];
            var marketAddress = [];
            var marketTel = [];
            var marketHours = [];
            var marketLatitude = [];
            var marketLongitude = [];
            var marketId = [];

            for(var i=0; i<marketCount;i++){
                marketName.push(locdist[i]['marketName']);
                marketAddress.push(locdist[i]['marketAddress']);
                marketTel.push(locdist[i]['marketTel']);
                marketHours.push(locdist[i]['marketHours']);
                marketLatitude.push(locdist[i]['marketLatitude']);
                marketLongitude.push(locdist[i]['marketLongitude']);
                marketId.push(locdist[i]['marketId']);
            }
            console.log(marketName);

            res.render('market.ejs', {marketCount: marketCount, marketName: marketName, marketAddress: marketAddress, 
                                      marketTel: marketTel, marketHours: marketHours, marketLatitude: marketLatitude,
                                      marketLongitude: marketLongitude, marketId: marketId,
                                      loginPoint: loginPoint});
        }
        else {
          res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
          res.write('<h2>매장정보 조회 실패</h2>');
          res.end();
        }
    });
    }
    else {
        //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
});




var marketInformation = function(callback){
    console.log('마켓정보 함수 호출됨.');

    pool.getConnection(function(err, conn){
        if(err) {
            if (conn) {
                conn.release(); //반드시 해제해야 함
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var columns = ['id', 'name', 'address', 'openinghours', 'phone', 'lati', 'longi'];
        var tablename = 'lotteria';

        var exec = conn.query("select ?? from ??", [columns, tablename], function(err, rows){
            conn.release(); 
            var dist = [];

            console.log('실행 대상 SQL : ' + exec.sql);

            if(rows.length > 0) {
                for (var i=0; i<rows.length; i++){
                    dist.push({marketId: rows[i]['id'], marketName: rows[i]['name'], marketAddress: rows[i]['address'],
                               marketHours: rows[i]['openinghours'], marketTel: rows[i]['phone'],
                               marketLatitude: rows[i]['lati'], marketLongitude: rows[i]['longi']});
                }
                callback(null, dist);
            }
            else {
                console.log('데이터가 없음.');
                callback(null, null);
            }
        });

        conn.on('error', function(err) {
            console.log('데이터베이스 연결 시 에러 발생함.');
            console.dir(err);

            callback(err, null);
        });
        
    });
}



// 매장 추가 라우터
// 매장 추가 라우터 
// 매장 추가 라우터  
// 매장 추가 라우터 
router.route('/process/marketAdd').post(function(req, res){
    console.log('/process/marketAdd 호출됨.');

    var paramName = req.body.name || req.query.name;
    var paramAddress = req.body.address || req.query.address;
    var paramTel = req.body.phone || req.query.phone;
    var paramHours = req.body.hours || req.query.hours;
    var paramLatitude = req.body.latitude || req.query.latitude;
    var paramLongitude = req.body.longitude || req.query.longitude;
    var paramId = req.body.id || req.query.id;

   // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
   if(pool) {
    marketADD(paramId, paramName, paramAddress, paramTel, paramHours, paramLatitude, paramLongitude, function(err, locdist){
        if(err) {
            console.error('매장 추가 중 에러 발생 : ' + err.stack);

            res.writeHead('200', {"Content-Type":"text/html;charser=utf8"});
            res.write('<h2>매장 추가 중 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();

            return;
        }

        // 결과 객체 있으면 성공 응답 전송
        if(locdist) {
            console.dir(locdist);
            console.log(locdist);
            console.log('inserted ' + locdist.affectedRows + ' rows');

            res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
            res.write('<h2>매장 추가 성공</h2>');
            res.write('<div><p>매장 ID : ' + paramId + '</div></p>');
            res.write('<div><p>매장 이름 : ' + paramName + '</div></p>');
            res.write('<div><p>매장 주소 : ' + paramAddress + '</div></p>');
            res.write('<div><p>매장 운영시간 : ' + paramHours + '</div></p>');
            res.write('<div><p>매장 번호 : ' + paramTel + '</div></p>');
            res.write('<div><p>매장 Latitude : ' + paramLatitude + '</div></p>');
            res.write('<div><p>매장 Longitude : ' + paramLongitude + '</div></p>');
            res.write("<br><br><a href='/public/marketAddDelete.html'>다시 입력하기</a>");
            res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
            res.end();
        }
        else {
          res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
          res.write('<h2>매장 추가 실패</h2>');
          res.write("<br><br><a href='/public/marketAddDelete.html'>다시 입력하기</a>");
          res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
          res.end();
        }
    });
    }
    else {
        //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write("<br><br><a href='/public/marketAddDelete.html'>다시 입력하기</a>");
        res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
        res.end();
    }
});


var marketADD = function(id, name, address, tel, hours, latitude, longitude, callback){
    console.log('마켓추가 함수 호출됨.');

    pool.getConnection(function(err, conn){
        if(err) {
            if (conn) {
                conn.release(); //반드시 해제해야 함
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var data = {id:id, name:name, address:address, openinghours:hours, phone:tel, lati:latitude, longi:longitude};

        var exec = conn.query('insert into lotteria set ?', data, function(err, rows){
            conn.release(); 

            console.log('실행 대상 SQL : ' + exec.sql);

            if (err){
                console.log('SQL 실행 시 에러 발생.');
                console.dir(err);
    
                callback(err, null);
                return;
            }
    
            callback(null, rows);
    
        });
    });
}




router.route('/process/marketDelete').post(function(req, res){
    console.log('/process/marketDelete 호출됨.');

    var paramName = req.body.name || req.query.name;
    var paramId = req.body.id || req.query.id;

   // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
   if(pool) {
    marketDELETE(paramId, paramName, function(err, locdist){
        if(err) {
            console.error('매장 삭제 중 에러 발생 : ' + err.stack);

            res.writeHead('200', {"Content-Type":"text/html;charser=utf8"});
            res.write('<h2>매장 삭제 중 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();

            return;
        }

        // 결과 객체 있으면 성공 응답 전송
        if(locdist) {
            console.dir(locdist);

            res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
            res.write('<h2>매장 삭제 성공</h2>');
            res.write('<div><p>매장 ID : ' + paramId + '</div></p>');
            res.write('<div><p>매장 이름 : ' + paramName + '</div></p>');
            res.write("<br><br><a href='/public/marketAddDelete.html'>다시 입력하기</a>");
            res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
            res.end();
        }
        else {
          res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
          res.write('<h2>매장 삭제 실패</h2>');
          res.write("<br><br><a href='/public/marketAddDelete.html'>다시 입력하기</a>");
          res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
          res.end();
        }
    });
    }
    else {
        //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write("<br><br><a href='/public/marketAddDelete.html'>다시 입력하기</a>");
        res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
        res.end();
    }
});



var marketDELETE = function(id, name, callback){
    console.log('마켓삭제 함수 호출됨.');

    pool.getConnection(function(err, conn){
        if(err) {
            if (conn) {
                conn.release(); //반드시 해제해야 함
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var data = {id:id};

        var exec = conn.query('DELETE FROM lotteria WHERE ?', data, function(err, rows){
            conn.release(); 

            console.log('실행 대상 SQL : ' + exec.sql);

            if (rows.affectedRows == 1){
                callback(null, rows);
            }else{
                console.log('데이터가 없음.')
                callback(null, null);
            }
            if (err){
                console.log('SQL 실행 시 에러 발생.');
                console.dir(err);
    
                callback(err, null);
                return;
            }
        });
    });
}






function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // 두 지점 간의 거리 (단위: km)
    return distance;
}
  
function deg2rad(deg) {
    return deg * (Math.PI/180);
}




var locationDistance = function(longitude, latitude, callback){
    console.log('거리 측정 입력된 x좌표 : ' + longitude + ', y좌표 : ' + latitude);

    pool.getConnection(function(err, conn){
        if(err) {
            if (conn) {
                conn.release(); //반드시 해제해야 함
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var columns = ['longi', 'lati', 'name', 'address', 'id', 'openinghours', 'phone'];
        var tablename = 'lotteria';

        var exec = conn.query("select ?? from ??", [columns, tablename], function(err, rows){
            conn.release(); 
            var dist = [];

            var minid = 1;
            console.log('실행 대상 SQL : ' + exec.sql);

            if(rows.length > 0) {

                for (var i=0; i<rows.length; i++){

                    if (dist.length == 0){

                        dist.push(distance(latitude, longitude, rows[i]['lati'], rows[i]['longi']));  

                    }
                    else if (distance(latitude, longitude, rows[i]['lati'], rows[i]['longi']) < dist[0]){
                        dist.pop()
                        dist.push(distance(latitude, longitude, rows[i]['lati'], rows[i]['longi']));
                        minid = parseInt(rows[i]['id']);

                    }

                }
                console.log('id 값은 ? : ' + minid)
                dist.push(rows[minid-1]['name'], rows[minid-1]['address'], rows[minid-1]['openinghours'], rows[minid-1]['phone'], rows[minid-1]['lati'], rows[minid-1]['longi']);
                callback(null, dist);
            }
            else {
                console.log('데이터가 없음.');
                callback(null, null);
            }
        });

        conn.on('error', function(err) {
            console.log('데이터베이스 연결 시 에러 발생함.');
            console.dir(err);

            callback(err, null);
        });
        
    });
}



//사용자를 인증하는 함수
var authUser = function(id, password, callback){
    console.log('authUser 호출됨 : ' + id + ', ' + password);

    //커넥션 풀에서 연결 객체를 가져옴

    pool.getConnection(function(err, conn){
        if(err) {
            if (conn) {
                conn.release(); //반드시 해제해야 함
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var columns = ['id', 'name', 'age'];
        var tablename = 'users';

        //SQL 문을 실행

        var exec = conn.query("select ?? from ?? where id = ? and password = ? ", 
                                [columns, tablename, id, password], function(err, rows){
            conn.release();
            console.log('실행 대상 SQL : ' + exec.sql);

            console.log(rows)
            console.log(exec.values[0][0])

            if(rows.length > 0) {
                console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', exec.values[2], password);
                callback(null, rows);
            }
            else {
                console.log('일치하는 사용자를 찾지 못함.');
                callback(null, null);
            }
        });

        conn.on('error', function(err) {
            console.log('데이터베이스 연결 시 에러 발생함.');
            console.dir(err);

            callback(err, null);
        });
    });
}


//사용자를 등록하는 함수
var addUser = function(id, name, age, password, callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name + ', ' + age);

    // 커넥션 풀에서 연결 객체를 가져옴
    pool.getConnection(function(err, conn){
        if (err){
            if (conn){
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결의 스레드 아이디 : ' + conn.threadId);
        
        //데이터를 객체로 만듭니다.
        var data = {id:id, name:name, age:age, password:password};

        var exec = conn.query('insert into users set ?', data, function(err, result){
            conn.release();
            console.log('실행된 SQL :' + exec.sql);

            if (err){
                console.log('SQL 실행 시 에러 발생.');
                console.dir(err);

                callback(err, null);
                return;
            }

            callback(null, result);
        });
    });
};


// 메뉴 추가 라우터
// 매뉴 추가 라우터 
// 매뉴 추가 라우터  
// 매뉴 추가 라우터 
router.route('/process/addmenu').post(function(req, res){
    console.log('/process/addmenu 호출됨.');

    var paramName = req.body.name || req.query.name;
    var paramPrice = req.body.price || req.query.price;
    var paramSet_price = req.body.set_price || req.query.set_price;
    var paramEvent_price = req.body.event_price || req.query.event_price;

   // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
   if(pool) {
    addHambergur(paramName, paramPrice, paramSet_price, paramEvent_price, function(err, locdist){
        if(err) {
            console.error('메뉴 추가 중 에러 발생 : ' + err.stack);

            res.writeHead('200', {"Content-Type":"text/html;charser=utf8"});
            res.write('<h2>메뉴 추가 중 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();

            return;
        }

        // 결과 객체 있으면 성공 응답 전송
        if(locdist) {
            console.dir(locdist);
            console.log(locdist);
            console.log('inserted ' + locdist.affectedRows + ' rows');

            res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
            res.write('<h2>매장 추가 성공</h2>');
            res.write('<div><p>매뉴 이름 : ' + paramName + '</div></p>');
            res.write('<div><p>매뉴 가격 : ' + paramPrice + '</div></p>');
            res.write('<div><p>매뉴 세트/콤보 : ' + paramSet_price + '</div></p>');
            res.write('<div><p>매뉴 든든점심 : ' + paramEvent_price + '</div></p>');
            res.write("<br><br><a href='/public/adddeletehambergur.html'>다시 입력하기</a>");
            res.write("<br><br><a href='/public/photo.html'>사진 업로드 하기</a>");
            res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
            res.end();
        }
        else {
          res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
          res.write('<h2>매뉴 추가 실패</h2>');
          res.write("<br><br><a href='/public/adddeletehambergur.html'>다시 입력하기</a>");
          res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
          res.end();
        }
    });
    }
    else {
        //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write("<br><br><a href='/public/adddeletehambergur.html'>다시 입력하기</a>");
        res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
        res.end();
    }
});




var addHambergur = function(name, price, set_price, event_price, callback) {

    // 커넥션 풀에서 연결 객체를 가져옴
    pool.getConnection(function(err, conn){
        if (err){
            if (conn){
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결의 스레드 아이디 : ' + conn.threadId);
        
        //데이터를 객체로 만듭니다.
        var data = {name:name, price:price, set_price:set_price, event_price:event_price};

        var exec = conn.query('insert into menu set ?', data, function(err, result){
            conn.release();
            console.log('실행된 SQL :' + exec.sql);

            if (err){
                console.log('SQL 실행 시 에러 발생.');
                console.dir(err);

                callback(err, null);
                return;
            }

            callback(null, result);
        });
    });
};






var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, '/VScode/lotteria/public/햄버거');
    },
    filename:function(req, file, callback){
        //callback(null, file.originalname + Date.now());
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname, extension);
        callback(null, basename + extension);
    }
});


var upload = multer({
    storage:storage,
    limits:{
        files:10,
        fileSize:1024*1024*1024
    }
});


router.route('/process/photo').post(upload.array('photo', 1), function(req, res){
    console.log('/process/photo 라우팅 함수 호출됨.');

    var files = req.files;
    console.log('==== 업로드된 파일 ====');
    if (files.length > 0) {
        console.dir(files[0]);
    } else{
        console.log('파일이 없습니다.');
    }

    var originalname;
    var filename;
    var mimetype;
    var size;
    
    if (Array.isArray(files)){
        for(var i = 0; i < files.length; i++) {
            originalname = files[i].originalname;
            filename = files[i].filename;
            mimetype = files[i].mimetype;
            size = files[i].size;
        }
    }

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>파일 업로드 성공</h1>");
    res.write("<p>저장파일 : " + filename + "</p>");
    res.write("<br><br><a href='/public/adddeletehambergur.html'>다시 입력하기</a>");
    res.write("<br><br><a href='/public/photo.html'>다시 업로드하기</a>");
    res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
    res.end();
});







router.route('/process/deletemenu').post(function(req, res){
    console.log('/process/deletemenu 호출됨.');

    var paramName = req.body.name || req.query.name;

   // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
   if(pool) {
    menuDELETE(paramName, function(err, locdist){
        if(err) {
            console.error('매뉴 삭제 중 에러 발생 : ' + err.stack);

            res.writeHead('200', {"Content-Type":"text/html;charser=utf8"});
            res.write('<h2>매뉴 삭제 중 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();

            return;
        }

        // 결과 객체 있으면 성공 응답 전송
        if(locdist) {
            console.dir(locdist);

            res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
            res.write('<h2>매장 삭제 성공</h2>');
            res.write('<div><p>매장 이름 : ' + paramName + '</div></p>');
            res.write("<br><br><a href='/public/adddeletehambergur.html'>다시 입력하기</a>");
            res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
            res.end();
        }
        else {
          res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
          res.write('<h2>매뉴 삭제 실패</h2>');
          res.write("<br><br><a href='/public/adddeletehambergur.html'>다시 입력하기</a>");
          res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
          res.end();
        }
    });
    }
    else {
        //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {"Content-Type":"text/html;charset=utf8"});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write("<br><br><a href='/public/adddeletehambergur.html'>다시 입력하기</a>");
        res.write("<br><br><a href='/public/login3.html'>메인 화면으로</a>");
        res.end();
    }
});



var menuDELETE = function(name, callback){
    console.log('메뉴삭제 함수 호출됨.');

    pool.getConnection(function(err, conn){
        if(err) {
            if (conn) {
                conn.release(); //반드시 해제해야 함
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var data = {name:name};

        var exec = conn.query('DELETE FROM menu WHERE ?', data, function(err, rows){
            conn.release(); 

            console.log('실행 대상 SQL : ' + exec.sql);

            if (rows.affectedRows == 1){
                callback(null, rows);
            }else{
                console.log('데이터가 없음.')
                callback(null, null);
            }
            if (err){
                console.log('SQL 실행 시 에러 발생.');
                console.dir(err);
    
                callback(err, null);
                return;
            }
        });
    });
}

