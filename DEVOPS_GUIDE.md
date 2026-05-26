# 📘 Complete DevOps Guide — Portfolio Project
## Docker · Kubernetes · Terraform · Prometheus · Grafana · Jenkins

> This guide covers every practical from INT377 using your own Next.js portfolio.

---

## 📁 Folder Structure

```
portfolio-devops/
├── Dockerfile                    ← Multi-stage production Dockerfile
├── next.config.ts                ← Must have output: "standalone"
├── .dockerignore
├── docker-compose.yml            ← Full local stack (app + monitoring)
├── k8s/
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── hpa.yaml
├── terraform/
│   ├── main.tf                   ← VPC + EC2 + Security Groups
│   ├── variables.tf
│   └── outputs.tf
├── monitoring/
│   ├── prometheus/
│   │   └── prometheus.yml
│   └── grafana/
│       └── provisioning/
│           ├── datasources/datasource.yml
│           └── dashboards/
│               ├── dashboard.yml
│               └── portfolio-dashboard.json
└── jenkins/
    └── Jenkinsfile
```

---

## PHASE 0 — One-Time Setup

### Prerequisites to install on your machine:
| Tool | Install |
|------|---------|
| Docker Desktop | https://docs.docker.com/get-docker/ |
| kubectl | https://kubernetes.io/docs/tasks/tools/ |
| Minikube | https://minikube.sigs.k8s.io/docs/start/ |
| Terraform | https://developer.hashicorp.com/terraform/install |
| AWS CLI | https://aws.amazon.com/cli/ |
| Git | https://git-scm.com/ |

---

## PHASE 1 — Git (Practical 1)

### Clone your portfolio
```bash
git clone https://github.com/apoorvaww/portfolio.git
cd portfolio
```

### Copy all DevOps files from this zip into the root
```bash
# Merge the portfolio-devops/ folder contents into your portfolio/ repo
cp -r portfolio-devops/. portfolio/
```

### Basic Git workflow
```bash
git status                          # See what changed
git add .                           # Stage all changes
git commit -m "Add DevOps files"    # Commit
git push origin master              # Push to GitHub

# Create a feature branch
git checkout -b devops/docker-setup
git add Dockerfile docker-compose.yml
git commit -m "Add Dockerfile and compose"
git push origin devops/docker-setup
```

---

## PHASE 2 — Docker (Practical 3)

### Step 1: Update next.config.ts
Open `next.config.ts` and make sure it has:
```ts
const nextConfig = {
  output: "standalone",   // ← THIS IS REQUIRED for the Docker build
};
export default nextConfig;
```

### Step 2: Build the Docker image
```bash
# From the portfolio root
docker build -t portfolio:latest .

# Watch the multi-stage build:
# Stage 1 (deps)  → installs prod dependencies
# Stage 2 (build) → builds Next.js
# Stage 3 (runner)→ minimal production image
```

### Step 3: Run the container
```bash
docker run -d \
  --name portfolio \
  -p 3000:3000 \
  portfolio:latest

# Visit http://localhost:3000
```

### Step 4: Useful Docker commands
```bash
docker ps                          # List running containers
docker logs portfolio              # View app logs
docker exec -it portfolio sh       # Enter container shell
docker stop portfolio              # Stop container
docker rm portfolio                # Remove container
docker images                      # List images
docker rmi portfolio:latest        # Remove image
```

### Step 5: Push to DockerHub
```bash
docker login
docker tag portfolio:latest YOUR_USERNAME/portfolio:latest
docker push YOUR_USERNAME/portfolio:latest
```

---

## PHASE 3 — Kubernetes with Minikube (Practical 4)

### Step 1: Start Minikube
```bash
minikube start --driver=docker --cpus=2 --memory=4096
minikube status
```

### Step 2: Point Docker to Minikube's registry (important!)
```bash
# This makes images available inside the cluster without pushing to DockerHub
eval $(minikube docker-env)

# Now rebuild the image inside Minikube
docker build -t portfolio:latest .
```

### Step 3: Update k8s/deployment.yaml
Change the image line:
```yaml
image: portfolio:latest          # local image
imagePullPolicy: Never           # don't pull from registry — use local
```

### Step 4: Apply all manifests
```bash
# Create namespace first
kubectl apply -f k8s/namespace.yaml

# Deploy
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml

# Check everything
kubectl get all -n portfolio
kubectl get pods -n portfolio
kubectl describe pod -n portfolio   # if a pod is not starting
```

### Step 5: Access the app
```bash
# For LoadBalancer services on Minikube:
minikube service portfolio-service -n portfolio

# Or use port-forward
kubectl port-forward service/portfolio-service 8080:80 -n portfolio
# Visit http://localhost:8080
```

### Step 6: Useful Kubernetes commands
```bash
kubectl get nodes
kubectl get namespaces
kubectl get pods -n portfolio -w          # watch pods live
kubectl logs -n portfolio <pod-name>
kubectl describe pod -n portfolio <pod>
kubectl delete pod -n portfolio <pod>     # K8s will restart it automatically
kubectl scale deployment portfolio --replicas=3 -n portfolio
kubectl rollout history deployment/portfolio -n portfolio
```

---

## PHASE 4 — Terraform + AWS EC2 (Practical — IaC)

### Step 1: Configure AWS CLI
```bash
aws configure
# Enter: AWS Access Key ID
#        AWS Secret Access Key
#        Default region: ap-south-1
#        Output format: json
```
> Get keys from AWS Console → IAM → Users → Security Credentials

### Step 2: Generate SSH key pair (if you don't have one)
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/portfolio-key
# This creates ~/.ssh/portfolio-key and ~/.ssh/portfolio-key.pub
```

### Step 3: Update terraform/variables.tf
```hcl
variable "public_key_path" {
  default = "~/.ssh/portfolio-key.pub"   # path to your public key
}
variable "docker_image" {
  default = "YOUR_DOCKERHUB_USERNAME/portfolio:latest"
}
```

### Step 4: Initialize and apply Terraform
```bash
cd terraform

terraform init          # Download AWS provider
terraform fmt           # Format files
terraform validate      # Validate syntax
terraform plan          # Preview what will be created
terraform apply         # Create resources (type 'yes' when prompted)
```

### Step 5: Connect to your EC2 instance
```bash
# Terraform outputs the IP — copy it, then:
ssh -i ~/.ssh/portfolio-key ubuntu@<EC2_PUBLIC_IP>

# Check Docker is running
docker ps
# Your portfolio container should already be running via user_data!
```

### Step 6: Visit your live site
```
http://<EC2_PUBLIC_IP>
```

### Step 7: Destroy when done (avoid charges!)
```bash
terraform destroy
```

---

## PHASE 5 — Prometheus + Grafana (Practicals 6 & 7)

### Option A: Using Docker Compose (Local)
```bash
# From portfolio root — starts everything at once
docker-compose up -d

# Services:
# Portfolio app  → http://localhost:3000
# Prometheus     → http://localhost:9090
# Grafana        → http://localhost:3001  (admin / admin123)
# Node Exporter  → http://localhost:9100
# cAdvisor       → http://localhost:8080
```

### Verify Prometheus is scraping
1. Open http://localhost:9090
2. Go to **Status → Targets**
3. You should see `portfolio`, `node-exporter`, `cadvisor` as UP

### Query examples in Prometheus
```promql
# CPU usage
100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory usage
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# Container CPU
rate(container_cpu_usage_seconds_total{name="portfolio"}[5m]) * 100
```

### Configure Grafana dashboards
1. Open http://localhost:3001 → login: admin / admin123
2. The Prometheus datasource is pre-configured automatically
3. Go to **Dashboards → Portfolio** — the system metrics dashboard is pre-loaded
4. To add more: **Dashboards → Import** → use IDs from https://grafana.com/grafana/dashboards
   - **1860** — Node Exporter Full
   - **193**  — Docker and system monitoring

### Option B: Deploy Prometheus + Grafana on Kubernetes
```bash
# Install Helm first: https://helm.sh/docs/intro/install/

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

# Access Grafana
kubectl port-forward -n monitoring svc/monitoring-grafana 3001:80
# Default: admin / prom-operator
```

---

## PHASE 6 — Jenkins CI/CD Pipeline (Practical 5)

### Step 1: Install Jenkins with Docker
```bash
docker run -d \
  --name jenkins \
  -p 8090:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### Step 2: Setup Jenkins
1. Open http://localhost:8090
2. Enter the admin password
3. Install **suggested plugins**
4. Create admin user

### Step 3: Install additional plugins
Go to **Manage Jenkins → Plugins → Available** and install:
- Docker Pipeline
- Kubernetes CLI
- Git

### Step 4: Add credentials
Go to **Manage Jenkins → Credentials → Global → Add Credential**:
- Kind: **Username with password**
  - ID: `dockerhub-credentials`
  - Username: your DockerHub username
  - Password: your DockerHub token
- Kind: **Secret file**
  - ID: `kubeconfig`
  - File: your `~/.kube/config`

### Step 5: Create Pipeline job
1. **New Item → Pipeline**
2. Name: `portfolio-pipeline`
3. Under **Pipeline** → **Definition**: Pipeline script from SCM
4. SCM: Git
5. Repository URL: https://github.com/apoorvaww/portfolio
6. Script Path: `jenkins/Jenkinsfile`
7. Save → **Build Now**

### Step 6: Watch the pipeline run
Each stage will show in the **Stage View**:
```
Checkout → Install & Build → Lint → Docker Build → Docker Push → Deploy to K8s → Verify
```

---

## PHASE 7 — Verify Everything End-to-End

```bash
# 1. App running in Docker
docker ps | grep portfolio

# 2. App running in Kubernetes
kubectl get pods -n portfolio

# 3. Prometheus scraping metrics
curl http://localhost:9090/api/v1/targets | grep portfolio

# 4. Grafana has data
# Visit http://localhost:3001 → Dashboards → Portfolio

# 5. EC2 instance live
curl http://<EC2_PUBLIC_IP>

# 6. Jenkins pipeline green
# Visit http://localhost:8090
```

---

## 🔑 Key Things to Remember for Viva/Exam

| Concept | What it does |
|---------|-------------|
| `output: "standalone"` in next.config.ts | Lets Next.js produce a self-contained build for Docker |
| Multi-stage Dockerfile | Smaller final image — only production files, no dev tools |
| `kubectl apply -f` | Declarative — K8s figures out what changed |
| `terraform plan` | Always preview before `apply` |
| Prometheus scrape_interval | How often metrics are collected (15s default) |
| Grafana datasource | Points Grafana at Prometheus to query metrics |
| Jenkins `credentials()` | Safely stores secrets outside Jenkinsfile |
| HPA | Auto-scales pods based on CPU/memory |
| Node Exporter | Exposes host OS metrics to Prometheus |
| cAdvisor | Exposes Docker container metrics to Prometheus |

---

## ⚠️ Common Errors & Fixes

**Docker build fails on `.next/standalone`**
→ Make sure `next.config.ts` has `output: "standalone"` and rebuild.

**Kubernetes pod stuck in `ImagePullBackOff`**
→ Either set `imagePullPolicy: Never` + use Minikube Docker env, or push to DockerHub.

**Prometheus target shows DOWN**
→ Check the container name in `prometheus.yml` matches the Docker Compose service name.

**Terraform error: `InvalidAMIID`**
→ Update `ami_id` in `variables.tf` — AMIs are region-specific. Search Ubuntu 22.04 in EC2 console.

**Jenkins can't run Docker**
→ The Jenkins container needs Docker socket: `-v /var/run/docker.sock:/var/run/docker.sock`
