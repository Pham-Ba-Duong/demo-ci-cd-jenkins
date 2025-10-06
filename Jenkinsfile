pipeline {
    agent any

    environment {
        IMAGE_NAME = "movie-platform"
        DOCKER_USER = "phambaduong"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Pham-Ba-Duong/demo-ci-cd-jenkins.git',
                    credentialsId: 'github-pat'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "=== Building Docker Image ==="
                        docker build -t $DOCKER_USER/$IMAGE_NAME:latest .
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $DOCKER_USER/$IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                sh '''
                    echo "=== Starting local deployment ==="
                    mkdir -p ~/project
                    cp docker-compose.prod.yml ~/project/docker-compose.yml
                    cd ~/project
                    # Tạo file .env từ ENV_DATA nếu cần
                    echo "$ENV_DATA" > .env
                    # Kéo image mới
                    docker compose --env-file .env pull
                    # Dừng container cũ nếu có
                    docker compose --env-file .env down
                    # Chạy container mới
                    docker compose --env-file .env up -d
                    # Dọn dẹp image không dùng
                    docker image prune -f
                '''
            }
        }
    }

    post {
        always {
            echo "=== Pipeline finished ==="
        }
        success {
            echo "✅ Deployment succeeded!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
