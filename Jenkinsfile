pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "college-management"
        DOCKER_CONTAINER = "college-app"
        DOCKER_PORT = "8082"   // Change this if you want a different port
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "📥 Cloning repository from main branch..."
                git branch: 'main', url: 'https://github.com/BK-KRISH/college-management.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🔨 Building Docker image with cache..."
                    sh "docker build --pull --rm -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                script {
                    echo "🛑 Stopping old container if exists..."
                    sh "docker ps -q --filter name=${DOCKER_CONTAINER} | grep -q . && docker stop ${DOCKER_CONTAINER} || true"
                    sh "docker ps -a -q --filter name=${DOCKER_CONTAINER} | grep -q . && docker rm ${DOCKER_CONTAINER} || true"
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    echo "🚀 Running new container on port ${DOCKER_PORT}"
                    sh "docker run -d -p ${DOCKER_PORT}:80 --name ${DOCKER_CONTAINER} ${DOCKER_IMAGE}:latest"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful! Visit -> http://localhost:${DOCKER_PORT}"
        }
        failure {
            echo "❌ Deployment Failed. Check logs."
        }
    }
}
