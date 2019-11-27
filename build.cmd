@ECHO OFF

go-bindata-assetfs -prefix "data/"  data/dist/...
go build
