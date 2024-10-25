import sqlite3

class DataRecord:
    def __init__(self):
        # Connect to the database
        self.DataBase = sqlite3.connect("User.db")
        self.cc = self.DataBase.cursor()
        # Create the table with data types for each column
        self.cc.execute("""
            CREATE TABLE IF NOT EXISTS UserData ( 
                Userid INTEGER PRIMARY KEY AUTOINCREMENT,
                UserName TEXT,
                Password TEXT
            )
        """)
        self.DataBase.commit()
        self.cc.execute("""
            CREATE TABLE IF NOT EXISTS UserSettingData ( 
                Userid INTEGER PRIMARY KEY AUTOINCREMENT,
                Theme TEXT,
                font INTEGER
            )
        """)
        self.DataBase.commit()
        

    def check_user(self,user):
        self.cc.execute('''SELECT UserName FROM UserData ''')
        user_in_DataBase = [row[0] for row in self.cc.fetchall()]
        if user in user_in_DataBase:
            return True
        else:
            return False


    def insert_new_user(self,user,password):
        try:
            self.cc.execute('SELECT COUNT(Userid) FROM UserData')
            id = (self.cc.fetchall()[0][0])+1
        except:
            id = 1
        self.cc.execute('INSERT INTO UserData (Userid, UserName ,Password ) VALUES (? , ?, ?);', (id,user, password))
        self.DataBase.commit()
    
    def check_password(self,user,password):
        execute_text = f'SELECT Password FROM UserData WHERE UserName = "{user}";'
        self.cc.execute(execute_text)
        password_in_db = [row[0] for row in self.cc.fetchall()]
        if password in password_in_db:
            return True
        else:
            return False
        
    def insert_user_setting(self,Theme,font,username):
        execute_text = f'SELECT Userid FROM UserData WHERE UserName = "{username}";'
        self.cc.execute(execute_text)
        user_id = [row[0] for row in self.cc.fetchall()]
        execute_text = f'SELECT Userid FROM UserSEttingData WHERE Userid = "{user_id}";'
        self.cc.execute(execute_text)
        check_user_id = [row[0] for row in self.cc.fetchall()]

        
        user_id = user_id[0]
        if check_user_id != []:
            
            execute_text = f'UPDATE UserSEttingData SET Theme={Theme},font={font} WHERE Userid = {user_id}'
            self.cc.execute(execute_text)
            self.DataBase.commit()
        else:
            self.cc.execute('INSERT INTO UserSettingData (Userid, Theme ,font) VALUES (? , ?, ?);', (user_id,Theme, font))
            self.DataBase.commit()

    def update_username(self,username,new_username):
        execte_text = f'UPDATE UserData SET UserName="{new_username}" WHERE UserName = "{username}"'
        self.cc.execute(execte_text)
        self.DataBase.commit()


    def update_password(self,username,password):
        execte_text = f'UPDATE UserData SET Password="{password}" WHERE UserName = "{username}"'
        self.cc.execute(execte_text)
        self.DataBase.commit()

    def select_user_data(self,username):
        execute_text = f'SELECT * FROM UserData WHERE UserName = "{username}";'
        self.cc.execute(execute_text)
        user_data = self.cc.fetchall()[0]
        user_id = user_data[0]
        userName = user_data[1]
        userPassword = user_data[2]
        
        return user_id,userName,userPassword
        
