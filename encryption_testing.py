from encrytion_V2 import Encrytion
import random

encryption = Encrytion()
slot = "abcdefghijklmnMNOPQRSTUVWXYZopqrstuvwxyzABCDEFGHIJKL!@#$%^&*()_+-=[]{|\;}:',./<>?`~1234567890 "
password = "123"

def check_encryption():
    incorrect_counter = 0
    invalid_counter = 0
    for i in range(100000):
        plain_text = ""
        for time in range(1000):
            plain_text += slot[random.randrange(len(slot))]
        cipyer_message,key = encryption.encryption(plain_text,password)
        return_message = encryption.unencryption(cipyer_message,key,password)
        if return_message != plain_text and return_message!= "Invalid Password,unable to decrypte":
            incorrect_counter+=1
            print(f'Incorrect encryption/decryption: Plain text: {plain_text},key: {key},return message: {return_message}')
        elif return_message == "Invalid Password,unable to decrypte":
            print("Invalid Password,unable to decrypte")
            invalid_counter +=1
        if i%100 == 0:
            print(f'testing number: {i}')
    print(f'total Incorrect: {incorrect_counter},total invalid: {invalid_counter}')

check_encryption()