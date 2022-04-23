//關於orm相關的變數以及function，這邊也是主要對資料庫進行資料CRUD的地方。
package service

import (
	"backend/app/dao"
	"backend/app/model"
	"fmt"
)

var UserFields = []string{"id", "account", "email"}

func SelectOneUsers(id int64) (*model.User, error) {
	userOne := &model.User{}
	err := dao.SqlSession.Select(UserFields).Where("id=?", id).First(&userOne).Error
	if err != nil {
		return nil, err
	} else {
		return userOne, nil
	}
}

func RegisterOneUser(account string, password string, email string) error {
	if !CheckOneUser(account) {
		return fmt.Errorf("User exists.")
	}
	user := model.User{
		Account:  account,
		Password: password,
		Email:    email,
	}
	insertErr := dao.SqlSession.Model(&model.User{}).Create(&user).Error
	return insertErr
}

func CheckOneUser(account string) bool {
	result := false
	var user model.User

	dbResult := dao.SqlSession.Where("account = ?", account).Find(&user)
	if dbResult.Error != nil {
		fmt.Printf("Get User Info Failed:%v\n", dbResult.Error)
	} else {
		result = true
	}
	return result
}
