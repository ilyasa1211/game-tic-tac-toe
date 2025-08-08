package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.Header)
		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			log.Println(err)
			return
		}

		defer conn.Close()

		for {
			messageType, message, err := conn.ReadMessage()

			if err != nil {
				log.Println(err)
				return
			}

			log.Printf("recv: %s", message)

			if err := conn.WriteMessage(messageType, message); err != nil {
				log.Println(err)
				return
			}
		}
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}