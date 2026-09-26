pipeline {
    agent any

    stages {
        stage('Build & Deploy') {
            steps {
                sh '''
                    docker compose up -d --build
                '''
            }
        }
    }
}