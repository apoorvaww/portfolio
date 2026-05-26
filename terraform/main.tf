terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1" 
}

resource "aws_security_group" "portfolio_sg" {
  name        = "portfolio-free-sg"
  description = "Allow web traffic to portfolio app"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "portfolio" {
  ami                    = "ami-0c7217cdde317cfec" 
  instance_type          = "t2.micro"              
  vpc_security_group_ids = [aws_security_group.portfolio_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              # Update system packages
              sudo apt-get update -y
              
              # Install Docker Daemon
              sudo apt-get install docker.io -y
              sudo systemctl start docker
              sudo systemctl enable docker
              
              # Pull your public Docker Hub image and run it on port 80
              sudo docker run -d --restart always -p 80:3000 apoorvaww/portfolio:latest
              EOF

  tags = {
    Name = "portfolio-free-tier"
  }
}

output "website_url" {
  value = "http://${aws_instance.portfolio.public_ip}"
}
