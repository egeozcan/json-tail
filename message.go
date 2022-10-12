package main

import (
	gonanoid "github.com/matoous/go-nanoid/v2"
	"time"
)

type anonymousMessage struct {
	Text string `json:"data"`
}

type messageIdentifier struct {
	Id string `json:"id"`
}

type fileIdentifier struct {
	FilePath string `json:"path"`
}

type message struct {
	messageIdentifier
	anonymousMessage
	fileIdentifier
	Date time.Time `json:"date"`
}

func newMessageWithFileName(text string, fileName string) *message {
	msg := newMessage(text)
	msg.FilePath = fileName

	return msg
}

func newMessage(text string) *message {
	msg := message{}
	msg.Text = text
	msg.Date = time.Now()

	id, err := gonanoid.New()
	if err != nil {
		return &msg
	}

	msg.Id = id

	return &msg
}
