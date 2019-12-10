package main

import (
	"github.com/gorilla/websocket"
	"sync"
)

type SocketQueue struct {
	mux sync.Mutex
	connections []*websocket.Conn
}

func (c *SocketQueue) Add(conn *websocket.Conn) {
	c.mux.Lock()
	c.connections = append(c.connections, conn)
	c.mux.Unlock()
}

func (c *SocketQueue) Remove(conn *websocket.Conn) (res bool) {
	res = false
	c.mux.Lock()
	for i, existingClient := range c.connections {
		if existingClient == conn {
			c.connections = append(c.connections[:i], c.connections[i+1:]...)
			res = true
		}
	}
	c.mux.Unlock()
	return
}

