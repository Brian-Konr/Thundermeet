/*
URL的規則與匹配路徑，以及該動作後續的執行行為
*/
package config

import (
	"backend/app"

	"github.com/gin-gonic/gin"
)

func RouteUsers(r *gin.Engine) {
	posts := r.Group("/v1/users")
	{
		posts.POST("/", app.NewUsersController().CreateUser)
		posts.GET("/", app.QueryUsersController().GetUser)
	}
}
