//負責堆放需要在database所創建的table資料
package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID        int64     `gorm:"primary_key;auto_increment" json:"id"`
	Account   string    `gorm:"size:100;not null;unique" json:"account"`
	Password  string    `gorm:"size:100;not null;" json:"password"`
	Email     string    `gorm:"size:100;not null;unique" json:"email"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}
