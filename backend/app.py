from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import hashlib

app = Flask(__name__)
CORS(app)

# === Database Config ===
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'yucca123',
    'database': 'employeedata'
}

# === Get DB Connection ===
def get_db_connection():
    return mysql.connector.connect(**db_config)

# === EMPLOYEE APIs ===
@app.route('/api/employees', methods=['GET'])
def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Employee")
    employees = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(employees)

@app.route('/api/employees', methods=['POST'])
def create_employee():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Employee (Name, Department, Role, Mobile, Email, DOB, JoiningDate, PAN, Aadhaar, BankAccount, ProfileID, ManagerID, LoginID)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        data.get('Name'), data.get('Department'), data.get('Role'), data.get('Mobile'),
        data.get('Email'), data.get('DOB'), data.get('JoiningDate'), data.get('PAN'),
        data.get('Aadhaar'), data.get('BankAccount'), data.get('ProfileID'),
        data.get('ManagerID'), data.get('LoginID')
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Employee created successfully'}), 201

# === DEPARTMENT APIs ===
@app.route('/api/departments', methods=['GET'])
def get_departments():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Department")
    departments = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(departments)

@app.route('/api/departments', methods=['POST'])
def create_department():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Department (DepartmentName) VALUES (%s)", (data.get('DepartmentName'),))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Department created successfully'}), 201

# === ROLE APIs ===
@app.route('/api/roles', methods=['GET'])
def get_roles():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Role")
    roles = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(roles)

@app.route('/api/roles', methods=['POST'])
def create_role():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Role (RoleName) VALUES (%s)", (data.get('RoleName'),))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Role created successfully'}), 201

# === EMPLOYEE SALARY APIs ===
@app.route('/api/employeesalary', methods=['GET'])
def get_employee_salaries():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM EmployeeSalary")
    salaries = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(salaries)

@app.route('/api/employeesalary', methods=['POST'])
def create_employee_salary():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO EmployeeSalary (EmployeeID, BasicSalary, Allowances, Deductions, NetSalary, PaymentDate)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        data.get('EmployeeID'), data.get('BasicSalary'), data.get('Allowances'),
        data.get('Deductions'), data.get('NetSalary'), data.get('PaymentDate')
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Salary entry created successfully'}), 201

# === EMPLOYEE REGISTER (Signup) ===
@app.route('/api/emp-register', methods=['POST'])
def register_employee():
    data = request.get_json()
    hashed_password = hashlib.sha256(data['Password'].encode()).hexdigest()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO EmployeeRegister (Name, Department, Role, Mobile, Email, DOB, JoiningDate, PAN, Aadhaar, BankAccount, Password)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        data.get('Name'), data.get('Department'), data.get('Role'), data.get('Mobile'),
        data.get('Email'), data.get('DOB'), data.get('JoiningDate'), data.get('PAN'),
        data.get('Aadhaar'), data.get('BankAccount'), hashed_password
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Employee registered successfully'}), 201

@app.route('/api/emp-register', methods=['GET'])
def get_registered_employees():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM EmployeeRegister")
    registered_employees = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(registered_employees)

# === DATA ENTRY APIs ===
@app.route('/api/data-entry', methods=['POST'])
def create_data_entry():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO data_entry (name, age, gender, email, mobile, address, department, role, joining_date)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        data.get('name'), data.get('age'), data.get('gender'), data.get('email'),
        data.get('mobile'), data.get('address'), data.get('department'),
        data.get('role'), data.get('joining_date')
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Data entry created successfully'}), 201

@app.route('/api/data-entry', methods=['GET'])
def get_data_entries():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM data_entry")
    data_entries = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data_entries)

# === LOGIN API ===
@app.route('/api/emp-login', methods=['POST'])
def login_employee():
    data = request.get_json()
    email = (data.get('Email') or data.get('email') or '').strip().lower()
    password = (data.get('Password') or data.get('password') or '').strip()

    if not email or not password:
        return jsonify({'message': 'Missing credentials'}), 400

    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    print("Trying login with:")
    print("Email:", email)
    print("Hashed password:", hashed_password)

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM EmployeeRegister WHERE LOWER(Email) = %s AND Password = %s",
            (email, hashed_password)
        )
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            print("User found:", user)
            return jsonify({'message': 'Login successful', 'user': user})
        else:
            print("Invalid credentials")
            return jsonify({'message': 'Invalid credentials'}), 401

    except Exception as e:
        print("Login error:", str(e))
        return jsonify({'message': 'Internal server error'}), 500


# === Emily Test Login (for debug) ===
@app.route('/api/test-emily-login', methods=['POST'])
def test_emily_login():
    data = request.get_json()
    email = (data.get('Email') or data.get('email') or '').strip().lower()
    password = (data.get('Password') or data.get('password') or '').strip()

    if email == "emily@yuccasolutions.com" and password == "emily123":
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM EmployeeRegister WHERE LOWER(Email) = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            return jsonify({'message': 'Login successful (Emily test)', 'user': user})
        else:
            return jsonify({'message': 'Emily not found in DB'}), 404

    return jsonify({'message': 'Invalid test credentials'}), 401

# === Create Admin on Startup ===
@app.before_request
def create_default_admin():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM EmployeeRegister WHERE Email = 'admin@example.com'")
    if not cursor.fetchone():
        hashed_password = hashlib.sha256("admin123".encode()).hexdigest()
        cursor.execute("""
            INSERT INTO EmployeeRegister 
            (Name, Department, Role, Mobile, Email, DOB, JoiningDate, PAN, Aadhaar, BankAccount, Password)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            'Admin User', 'Admin Department', 'admin', '9876543210',
            'admin@example.com', '1990-01-01', '2020-01-01',
            'ABCDE1234F', '123456789012', '1234567890', hashed_password
        ))
        conn.commit()
        print("✅ Default admin account created.")
    cursor.close()
    conn.close()

# === RUN APP ===
if __name__ == '__main__':
    app.run(debug=True)
