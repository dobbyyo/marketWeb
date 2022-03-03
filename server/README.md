200 성공
300 리다이렉트
400 클라이언트 에러
500 서버 에러

hasMany: 1:n
x.belongsToMany(~): x는 여러개의~를 가지고 있다.
x.belongsTo(~): x는 ~에게 속해져있다. 1:n
x.hasMany(~): x는 ~를 여러개 가진다. 1:n

1:N
hasMany => <= belongsTo
1:1
hasOne => <= belongsTo
N:M
belongsToMany => <= belongsToMany
