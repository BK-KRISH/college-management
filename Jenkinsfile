pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "college-management"
        DOCKER_CONTAINER = "college-app"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/BK-KRISH/college-management.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Stop Old Container') {
            steps {
                script {
                    // Stop old container if running
                    sh "docker ps -q --filter name=${DOCKER_CONTAINER} | grep -q . && docker stop ${DOCKER_CONTAINER} || true"
                    // Remove old container if exists
                    sh "docker ps -a -q --filter name=${DOCKER_CONTAINER} | grep -q . && docker rm ${DOCKER_CONTAINER} || true"
                }
            }
        }

        stage('Run New Container') {
            steps {
                sh "docker run -d -p 8082:80 --name ${DOCKER_CONTAINER} ${DOCKER_IMAGE}:latest"
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful! Visit -> http://localhost:8082"
        }
        failure {
            echo "❌ Deployment Failed. Check logs."
        }
    }
}
