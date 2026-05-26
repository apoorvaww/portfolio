variable "container_name" {
  description = "Name of the portfolio container"
  default     = "portfolio-terraform"
}

variable "external_port" {
  description = "Port to expose on host"
  default     = 3000
}