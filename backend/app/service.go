/*
放api收到request後續所要執行的服務行為與response等
*/

package app

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UsersController struct{}

func NewUsersController() UsersController {
	return UsersController{}
}

func QueryUsersController() UsersController {
	return UsersController{}
}

func (u UsersController) CreateUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": 0,
		"msg":    "success Register",
		"data":   nil,
	})
}

func (u UsersController) GetUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": 0,
		"msg":    "success get data",
		"data":   nil,
	})
}
