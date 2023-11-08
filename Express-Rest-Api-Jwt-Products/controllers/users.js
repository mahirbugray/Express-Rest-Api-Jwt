const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.postRegister = (req, res, next) => {
    const {name, surname, email, password} = req.body

    bcrypt.hash(password, 10)
    .then(hashedPassword => {
        console.log(hashedPassword)
        const user = new User({
            email: email,
            name: name,
            surname: surname,
            password: hashedPassword
        })
    user.save()
    .then((user) => {
        res.json(user)
    }).catch((err) => {
        console.log({message: 'Kullanıcı kaydı başarısız.'})
    })
    })
   
}

exports.postLogin = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user =>{
        if(user){
            bcrypt.compare(password, user.password)
            .then(result => {
                if(result){
                    const payload = {
                        name: user.name
                    }
                    const secret_key = 'private Secret Key'   //istediğimiz şeyi yazabiliriz.
                    const token = jwt.sign(payload, secret_key, {
                    expiresIn: '25m' });     //expriesIn token süresi.
                    
                    res.json(token);
                    // ORJİNAL JWT SİGN İSKELETİ
                    //   jwt.sign({
                    //     data: 
                    //   }, 'secret', { expiresIn: '1h' });
                }
                else{
                    res.json('Şifre hatası')
                }
            })
        }
        else{
            res.json('Kullanıcı bulunamadı')
        }
    })
}