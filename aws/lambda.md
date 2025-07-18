### AWS Lambda — Complete Guide for Beginners

**AWS Lambda** is a serverless compute service provided by Amazon Web Services. With Lambda, you can run backend code without provisioning or managing servers. You simply upload your code, and AWS Lambda takes care of everything required to run and scale your application.

---

## 🚀 What is AWS Lambda?

* **Event-driven**: Lambda executes code in response to triggers like HTTP requests, file uploads to S3, changes in DynamoDB, SNS messages, etc.
* **Serverless**: No need to manage infrastructure. AWS automatically handles scaling, patching, and maintenance.
* **Short-lived functions**: Ideal for tasks that complete quickly (within 15 minutes).
* **Pay-as-you-go**: You only pay for compute time used (in milliseconds).

---

## 📦 Common Use Cases

| Use Case                      | Trigger                   |
| ----------------------------- | ------------------------- |
| Image processing after upload | S3 `ObjectCreated` event  |
| Real-time file transformation | API Gateway HTTP endpoint |
| Serverless REST APIs          | API Gateway → Lambda      |
| Scheduled jobs (cron)         | CloudWatch Events         |
| Processing messages           | SQS or SNS → Lambda       |
| DynamoDB stream processing    | DynamoDB Stream event     |

---

## 🔧 How Lambda Works (Basic Flow)

1. **Create Function** (via AWS Console, CLI, or IaC like Terraform)
2. **Set Trigger** (e.g., API Gateway, S3, CloudWatch)
3. **Write Code** (in Node.js, Python, Java, Go, etc.)
4. **Deploy Function**
5. **Lambda Gets Triggered Automatically**

---

## 🛠️ Example: Lambda with S3 Trigger (Python)

### Step 1: Create a Lambda Function

You can use the AWS Console or CLI.

```python
# lambda_function.py

def lambda_handler(event, context):
    print("Event: ", event)
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        print(f"New file uploaded: s3://{bucket}/{key}")
    return {"statusCode": 200, "body": "Success"}
```

---

### Step 2: Add a Trigger

* Go to your Lambda function.
* Click **Add Trigger** → Select **S3**.
* Choose the bucket and event type (`PUT` for new uploads).

---

## 📌 Key Concepts

| Concept        | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| **Handler**    | Entry point of your Lambda function (e.g., `lambda_handler`) |
| **Event**      | JSON data that triggered the function                        |
| **Context**    | Metadata about the invocation (e.g., time, function name)    |
| **Timeout**    | Max execution time (default: 3s, max: 15min)                 |
| **Memory**     | From 128MB to 10GB, CPU scales with memory                   |
| **Cold Start** | Initial latency when function starts for the first time      |

---

## 📎 Lambda Deployment Options

* Inline editor (AWS Console)
* Upload a `.zip` file
* Upload via AWS CLI
* Use **AWS SAM**, **Serverless Framework**, or **Terraform** for IaC

---

## 💡 Best Practices

* Keep functions small and focused
* Use environment variables for config
* Monitor with **CloudWatch Logs**
* Set appropriate timeout/memory
* Avoid long-running tasks (>15 mins)

---

## 🧠 Bonus: REST API with Lambda + API Gateway

1. Create Lambda
2. Create API Gateway (HTTP or REST)
3. Connect endpoint to Lambda
4. Deploy and test

Example Event (via API Gateway):

```json
{
  "httpMethod": "GET",
  "queryStringParameters": {"name": "John"}
}
```

Handler:

```python
def lambda_handler(event, context):
    name = event['queryStringParameters'].get('name', 'World')
    return {
        "statusCode": 200,
        "body": f"Hello, {name}!"
    }
```

---

Would you like:

* A tutorial to build a **Node.js Lambda**?
* How to deploy using **Terraform** or **Serverless Framework**?
* Lambda with **API Gateway**, **SQS**, **S3**, or **DynamoDB**?

Let me know what direction you'd like to explore next.
