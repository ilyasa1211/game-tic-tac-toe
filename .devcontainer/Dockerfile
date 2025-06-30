FROM debian:bookworm-slim

ARG USERNAME=dev
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -s /usr/bin/bash -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y ca-certificates sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# Install curl
RUN apt install -y curl

# Install Go
RUN curl -LO https://go.dev/dl/go1.24.4.linux-amd64.tar.gz && \
    rm -rf /usr/local/go && \
    tar -C /usr/local -xzf go1.24.4.linux-amd64.tar.gz && \
    rm go1.24.4.linux-amd64.tar.gz && \
    echo 'export PATH=$PATH:/usr/local/go/bin' >> /home/$USERNAME/.profile

# Install NodeJS
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | sudo bash - && \
    apt install -y nodejs && \
    corepack enable pnpm && \
    yes | pnpm -v

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME
