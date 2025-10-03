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
                echo "🔨 Building Docker image..."
                bat "docker build --pull --rm -t %DOCKER_IMAGE% ."
            }
        }

        stage('Stop Old Container') {
            steps {
                echo "🛑 Stopping old container if exists..."
                // Stop container if running
                bat "for /f \"tokens=*\" %%i in ('docker ps -q --filter name=%DOCKER_CONTAINER%') do docker stop %%i"
                // Remove old container if exists
                bat "for /f \"tokens=*\" %%i in ('docker ps -a -q --filter name=%DOCKER_CONTAINER%') do docker rm %%i"
            }
        }

        stage('Run New Container') {
            steps {
                echo "🚀 Running new container on port %DOCKER_PORT%"
                bat "docker run -d -p %DOCKER_PORT%:80 --name %DOCKER_CONTAINER% %DOCKER_IMAGE%"
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful! Visit -> http://localhost:%DOCKER_PORT%"
        }
        failure {
            echo "❌ Deployment Failed. Check logs."
        }
    }
}
