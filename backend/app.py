from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# === MySQL config ===
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'yucca123',
    'database': 'employeedata'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

# ---------------------------
# Department Endpoints
# ---------------------------

@app.route('/api/departments', methods=['GET'])
def get_departments():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Department')
    departments = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(departments)

@app.route('/api/departments', methods=['POST'])
def create_department():
    data = request.get_json()
    name = data.get('DepartmentName')
    description = data.get('Description')

    if not name:
        return jsonify({'error': 'DepartmentName is required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO Department (DepartmentName, Description) VALUES (%s, %s)',
        (name, description)
    )
    conn.commit()
    department_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return jsonify({'DepartmentID': department_id, 'DepartmentName': name, 'Description': description})

# ---------------------------
# Role Endpoints
# ---------------------------

@app.route('/api/roles', methods=['GET'])
def get_roles():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Role')
    roles = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(roles)

@app.route('/api/roles', methods=['POST'])
def create_role():
    data = request.get_json()
    name = data.get('RoleName')
    description = data.get('Description')

    if not name:
        return jsonify({'error': 'RoleName is required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO Role (RoleName, Description) VALUES (%s, %s)',
        (name, description)
    )
    conn.commit()
    role_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return jsonify({'RoleID': role_id, 'RoleName': name, 'Description': description})

# ---------------------------
# Employee Endpoints
# ---------------------------

@app.route('/api/employees', methods=['GET'])
def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Employee')
    employees = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(employees)

@app.route('/api/employees', methods=['POST'])
def create_employee():
    data = request.get_json()
    fields = [
        'FullName', 'DateOfBirth', 'Gender', 'PANNumber', 'AadharNumber',
        'MobileNumber', 'EmailID', 'Address', 'EmergencyContactName', 'EmergencyContactNumber',
        'JoiningDate', 'Designation', 'Department', 'EmployeeStatus',
        'BankAccountNumber', 'BankName', 'IFSCCode', 'BranchName',
        'DepartmentID', 'RoleID', 'ManagerID', 'ProfileID'
    ]

    values = [data.get(f) for f in fields]

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f'''
        INSERT INTO Employee ({','.join(fields)}) 
        VALUES ({','.join(['%s'] * len(fields))})
    ''', values)
    conn.commit()
    employee_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return jsonify({'EmployeeID': employee_id})

# ---------------------------
# EmployeeSalary Endpoints
# ---------------------------

@app.route('/api/employeesalary', methods=['GET'])
def get_employee_salaries():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('''
        SELECT es.SalaryID, es.EmployeeID, e.FullName, es.EncryptedSalary, es.EffectiveFrom, es.Notes
        FROM EmployeeSalary es
        JOIN Employee e ON es.EmployeeID = e.EmployeeID
    ''')
    salaries = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(salaries)

@app.route('/api/employeesalary', methods=['POST'])
def create_employee_salary():
    data = request.get_json()
    employee_id = data.get('EmployeeID')
    encrypted_salary = data.get('EncryptedSalary')
    effective_from = data.get('EffectiveFrom')
    notes = data.get('Notes')

    if not employee_id or not encrypted_salary or not effective_from:
        return jsonify({'error': 'EmployeeID, EncryptedSalary, and EffectiveFrom are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO EmployeeSalary (EmployeeID, EncryptedSalary, EffectiveFrom, Notes) VALUES (%s, %s, %s, %s)',
        (employee_id, encrypted_salary, effective_from, notes)
    )
    conn.commit()
    salary_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return jsonify({'SalaryID': salary_id})
@app.route('/api/pingdb')
def ping_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT 1')
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})


# ---------------------------
# Main
# ---------------------------
if __name__ == '__main__':
    app.run(port=5000, debug=True)
