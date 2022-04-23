package main

import (
	"backend/app/config"
	"backend/app/model"
	"os"

	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"

	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	//read env
	envErr := godotenv.Load()
	if envErr != nil {
		log.Fatal("Error loading .env file")
	}

	//get env
	port := os.Getenv("PORT")
	dbUrl := os.Getenv("DATABASE_URL")
	db, ormErr := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if ormErr != nil {
		panic(ormErr)
	}
	migrateErr := db.AutoMigrate(&model.User{})
	if migrateErr != nil {
		return
	}

	//init server
	app := gin.Default()
	app.GET("/hc", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "health check",
		})
	})
	config.RouteUsers(app)
	err := app.Run(":" + port)
	if err != nil {
		panic(err)
	}
}
